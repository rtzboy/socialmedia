import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CreatePost from '../../components/homepage/CreatePost';
import SkeletonPost from '../../components/skeletons/SkeletonPost';
import HeaderProfile from '../../components/userprof/HeaderProfile';
import ProfilePost from '../../components/userprof/ProfilePost';
import { infiniteScrollPost, setGeneralInfo } from '../../features/user/user-profile-slice';
import httpAxiosService from '../../lib/helpers/axiosService';

const POST_PER_SCROLL: number = 4;

const UserPrivProfile = () => {
	const { token, id } = useAppSelector(state => state.userAuth);
	const userProfileTest = useAppSelector(state => state.userProfile);
	const dispatchApp = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);

	// TODO: improve Math.ceil...
	const observer = useRef<IntersectionObserver | null>(null);
	const lastPostElemRef = useCallback(
		(post: HTMLElement) => {
			if (!userProfileTest) return;
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(entries => {
				if (
					entries[0].isIntersecting &&
					Math.ceil(userProfileTest.totalCount / POST_PER_SCROLL) !== page
				) {
					setPage(prevPage => prevPage + 1);
				}
			});
			if (post) observer.current.observe(post);
		},
		[isLoading]
	);

	const callPrivatePosts = async (token: string, idUserParam?: string) => {
		setIsLoading(true);
		const { data, status } = await httpAxiosService(token).get(
			`/userpriv/pagprofile/${idUserParam}?pagination=${page}`
		);
		if (status === 200) {
			setIsLoading(false);
			if (page === 1) {
				dispatchApp(setGeneralInfo(data.result));
			} else {
				dispatchApp(infiniteScrollPost(data.result.userProfilePosts));
			}
		}
	};

	useEffect(() => {
		callPrivatePosts(token, id);
	}, [page]);

	if (userProfileTest === null)
		return (
			<div className='mx-auto flex max-w-3xl flex-col gap-4 p-4'>
				<SkeletonPost />
			</div>
		);

	const contentProfilePost = userProfileTest?.userProfilePosts.map((profilePost, idx) => {
		if (userProfileTest.userProfilePosts.length === idx + 1) {
			return <ProfilePost ref={lastPostElemRef} key={profilePost._id} userPosts={profilePost} />;
		}
		return <ProfilePost key={profilePost._id} userPosts={profilePost} />;
	});

	return (
		<div className='mx-auto flex max-w-3xl flex-col gap-4 p-4'>
			<HeaderProfile
				userHeader={userProfileTest.userProfileInfo}
				postCount={userProfileTest.userProfilePosts.length}
				privProfile
			/>
			<CreatePost />
			<div className='flex items-start gap-4'>
				<div className='w-[40%] rounded-lg bg-slate-100 p-4'>
					<div className='text-lg font-semibold'>About</div>
				</div>
				<div className='flex w-[60%] flex-col gap-4'>
					{contentProfilePost}
					{isLoading && <SkeletonPost />}
				</div>
			</div>
		</div>
	);
};

export default UserPrivProfile;

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import SkeletonPost from '../../components/skeletons/SkeletonPost';
import AboutProfile from '../../components/userprof/AboutProfile';
import HeaderProfile from '../../components/userprof/HeaderProfile';
import ProfilePost from '../../components/userprof/ProfilePost';
import { POST_PER_SCROLL } from '../../constants/string_helpers';
import { infiniteScrollPost, setGeneralInfo } from '../../features/user/user-profile-slice';
import httpAxiosService from '../../lib/helpers/axiosService';

type Props = {
	idUrl?: string;
	token: string;
};

const UserPubProfile = ({ idUrl, token }: Props) => {
	const { _id, following } = useAppSelector(state => state.userHeader);
	const userPublicProfile = useAppSelector(state => state.userProfile);
	let followStatus = following.includes(idUrl || _id);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const dispatchApp = useAppDispatch();

	// TODO: improve Math.ceil...
	const observer = useRef<IntersectionObserver | null>(null);
	const lastPostElemRef = useCallback(
		(post: HTMLElement) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(entries => {
				if (
					entries[0].isIntersecting &&
					Math.ceil(userPublicProfile!.totalCount / POST_PER_SCROLL) !== page
				) {
					setPage(prevPage => prevPage + 1);
				}
			});
			if (post) observer.current.observe(post);
		},
		[isLoading]
	);

	// TODO: move call to an api file
	const callUserProfile = async (token: string, idUserParam?: string) => {
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
		callUserProfile(token, idUrl);
	}, [idUrl, page]);

	if (!userPublicProfile) return <div>Loading</div>;

	const contentProfilePost = userPublicProfile?.userProfilePosts.map((profilePost, idx) => {
		if (userPublicProfile.userProfilePosts.length === idx + 1) {
			return <ProfilePost ref={lastPostElemRef} key={profilePost._id} userPosts={profilePost} />;
		}
		return <ProfilePost key={profilePost._id} userPosts={profilePost} />;
	});

	return (
		<div className='mx-auto flex max-w-3xl flex-col gap-4 p-4'>
			<HeaderProfile
				userHeader={userPublicProfile?.userProfileInfo}
				postCount={userPublicProfile?.totalCount}
				followStatus={followStatus}
			/>
			<div className='flex items-start gap-4'>
				<div className='w-[40%] rounded-lg bg-slate-100 p-4 dark:bg-black-400 dark:text-white'>
					<AboutProfile data={userPublicProfile.userProfileInfo} />
				</div>
				<div className='flex w-[60%] flex-col gap-4'>
					{contentProfilePost}
					{isLoading && <SkeletonPost />}
				</div>
			</div>
		</div>
	);
};

export default UserPubProfile;

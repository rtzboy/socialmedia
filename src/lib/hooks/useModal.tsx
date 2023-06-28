import { useState } from 'react';
import { UserFeeds } from '../../components/homepage/NewFeeds';
import PostDeleteForm from '../../components/post-form/PostDeleteForm';
import PostEditForm from '../../components/post-form/PostEditForm';

const useModal = (postInfo: UserFeeds) => {
	const [contentModal, setContentModal] = useState<JSX.Element | undefined>();

	const closeModal = () => setContentModal(undefined);

	const openEditModal = () =>
		setContentModal(<PostEditForm closeModal={closeModal} currentPost={postInfo} />);

	const openDeleteModal = () =>
		setContentModal(<PostDeleteForm closeModal={closeModal} currentPost={postInfo} />);

	return { contentModal, closeModal, openEditModal, openDeleteModal };
};

export default useModal;

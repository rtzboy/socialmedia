import { useState } from 'react';
import PostDeleteForm from '../../components/post-form/PostDeleteForm';
import PostEditForm from '../../components/post-form/PostEditForm';
import { UserFeeds } from '../../types/user.model';

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

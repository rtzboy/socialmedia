import { useState } from 'react';
import { UserFeeds } from '../../components/homepage/NewFeeds';
import PostDeleteForm from '../../components/post-form/PostDeleteForm';

const useModal = (postInfo: UserFeeds) => {
	const [contentModal, setContentModal] = useState<JSX.Element | undefined>();

	const closeModal = () => setContentModal(undefined);

	const openDeleteModal = () =>
		setContentModal(<PostDeleteForm closeModal={closeModal} currentPost={postInfo} />);

	return { contentModal, closeModal, openDeleteModal };
};

export default useModal;

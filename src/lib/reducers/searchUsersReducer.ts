export const INITIAL_SEARCH_QUERY = {
	search: '',
	usersData: undefined,
	loading: false,
	error: ''
};

export const searchUsersReducer = (state: SearchState, action: SearchActions): SearchState => {
	switch (action.type) {
		case 'START_SEARCH':
			return {
				...state,
				loading: true,
				error: ''
			};

		case 'SET_USERS_SEARCH':
			return {
				...state,
				usersData: action.payload,
				loading: false
			};
		case 'QUERY_SEARCH':
			return {
				...state,
				search: action.payload,
				loading: true
			};
		case 'ERROR_SEARCH':
			return {
				...state,
				usersData: undefined,
				loading: false,
				error: action.payload
			};
		case 'RESET_SEARCH':
			return { ...INITIAL_SEARCH_QUERY };
		default:
			throw new Error(` Error action: ${action}`);
	}
};

interface SearchState {
	search: string;
	usersData: UsersResult[] | undefined;
	loading: boolean;
	error: string;
}

interface UsersResult {
	_id: string;
	username: string;
	profilePic: string;
}

interface StartSearchAction {
	type: 'START_SEARCH';
}

interface SetUsersSearchAction {
	type: 'SET_USERS_SEARCH';
	payload: UsersResult[] | undefined;
}

interface UserQuerySearchAction {
	type: 'QUERY_SEARCH';
	payload: string;
}

interface ErrorSearchAction {
	type: 'ERROR_SEARCH';
	payload: string;
}

interface ResetSearchAction {
	type: 'RESET_SEARCH';
}

type SearchActions =
	| StartSearchAction
	| SetUsersSearchAction
	| UserQuerySearchAction
	| UserQuerySearchAction
	| ErrorSearchAction
	| ResetSearchAction;

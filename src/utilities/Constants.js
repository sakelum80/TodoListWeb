const API_BASE_URL_DEVELOPMENT = 'https://localhost:44347/api';

const ENDPOINTS = {
    GET_ALL_TODO_LIST: 'TodoList',
    GET_TODO_LIST_BY_ID: 'GetItem',
    CREATE_TODO_LIST: 'CreateItem',
    UPDATE_TODO_LIST_BY_ID: 'UpdateItem',
    DELETE_TODO_LIST_BY_ID: 'DeleteItem'
};

const development = {
    API_URL_GET_ALL_TODO_LIST : `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ALL_TODO_LIST}`,
    API_URL_GET_TODO_LIST_BY_ID : `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_TODO_LIST_BY_ID}`,
    API_URL_CREATE_TODO_LIST : `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE_TODO_LIST}`,
    API_URL_UPDATE_TODO_LIST_BY_ID : `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_TODO_LIST_BY_ID}`,
    API_URL_DELETE_TODO_LIST_BY_ID : `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_TODO_LIST_BY_ID}`
};

const Constants = process.env.NODE_ENV === 'development' ? development : development;

export default Constants;
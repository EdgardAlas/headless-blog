interface WithPagination<T> {
	data: T;
	totalPages: number;
	page: number;
	size: number;
}


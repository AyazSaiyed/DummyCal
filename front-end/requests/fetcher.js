import _api from './api';

const fetcher = url => _api.get(url).then(res => res.data);

export default fetcher;
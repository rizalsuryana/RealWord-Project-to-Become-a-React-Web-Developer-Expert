const api = (() => {
  const BASE_URL = 'https://openspace-api.netlify.app/v1';

  // Fungsi untuk memeriksa status respons
  const checkStatus = async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data;
  };

  // Fungsi untuk melakukan fetch dengan header Authorization
  const _fetchWithAuth = async (url, options = {}) => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('No access token found.');
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Fungsi untuk menyimpan token di localStorage
  const putAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
  };

  // Fungsi untuk mengambil token dari localStorage
  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  // Fungsi untuk melakukan register pengguna
  const register = async ({ id, name, password }) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, password }),
    });

    const data = await checkStatus(response);
    return data.user;
  };

  // Fungsi untuk melakukan login dan mendapatkan token
  const login = async ({ id, password }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password }),
    });

    const data = await checkStatus(response);
    return data.token;
  };

  // Fungsi untuk mengambil profile pengguna yang sedang login
  const getOwnProfile = async () => {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const data = await checkStatus(response);
    return data.user;
  };

  // Fungsi untuk mengambil semua pengguna
  const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await checkStatus(response);
    return data.users;
  };

  // Fungsi untuk mengambil semua talks
  const getAllTalks = async () => {
    const response = await fetch(`${BASE_URL}/talks`);
    const data = await checkStatus(response);
    return data.talks;
  };

  // Fungsi untuk mengambil detail talk berdasarkan ID
  const getTalkDetail = async (id) => {
    const response = await fetch(`${BASE_URL}/talks/${id}`);
    const data = await checkStatus(response);
    return data.talkDetail;
  };

  // Fungsi untuk membuat talk baru
  const createTalk = async ({ text, replyTo = '' }) => {
    const response = await _fetchWithAuth(`${BASE_URL}/talks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, replyTo }),
    });

    const data = await checkStatus(response);
    return data.talk;
  };

  // Fungsi untuk toggle like pada talk
  const toggleLikeTalk = async (id) => {
    const response = await _fetchWithAuth(`${BASE_URL}/talks/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ talkId: id }),
    });

    await checkStatus(response); // hanya cek status tanpa return data
  };

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllTalks,
    createTalk,
    toggleLikeTalk,
    getTalkDetail,
  };
})();

export default api;

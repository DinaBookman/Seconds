import { API_URL } from "./env";
export const fetchProducts = async (query) => {
    try {
        const response = await fetch(`${API_URL}/products?${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchProduct = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};


export const addProduct = async (data) => {
    try {
        let response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            body: data,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (response.status === 401) {

            const tokens = await refreshToken();

            if (tokens.accessToken) {
             
                response = await fetch(`${API_URL}/products`, {
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
            } else {
                throw new Error('Refresh token failed. Please log in again.');
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error uploading product:', error);
        throw error;
    }
};


export const updateProduct = async (edit, id) => {

    try {
        let response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PATCH',
            body: edit,
            credentials: 'include',
            headers: {

                'Accept': 'application/json'
            }
        });

        if (response.status === 401) {

            const tokens = await refreshToken();

            if (tokens.accessToken) {

                response = await fetch(`${API_URL}/products/${id}`, {
                    method: 'PATCH',
                    body: edit,
                    credentials: 'include',
                    headers: {

                        'Accept': 'application/json'
                    }
                });
            } else {
                throw new Error('Refresh token failed. Please log in again.'); 
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};



export const removeProduct = async (productId) => {

    try {
        let response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE',
            credentials: 'include',

        });
        if (response.status === 401) {
            
            const tokens = await refreshToken();

            if (tokens.accessToken) {
                
                response = await fetch(`${API_URL}/products/${productId}`, {
                    method: 'DELETE',
                    credentials: 'include',

                });
            } else {
                throw new Error('Refresh token failed. Please log in again.');
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error removing product:', error);
        throw error;
    }
}

export const fetchUser = async (userId) => {


    try {
        let response = await fetch(`${API_URL}/users/${userId}`,
            {
                credentials: 'include'
            });
        if (response.status === 401) {
           
            const tokens = await refreshToken();

            if (tokens.accessToken) {
               
                response = await fetch(`${API_URL}/users/${userId}`,
                    {
                        credentials: 'include'
                    });
            } else {
                throw new Error('Refresh token failed. Please log in again.');
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error removing product:', error);
        throw error; 
    }
};

export const addUser = async (user) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (userId, updatedUser) => {

    try {

        let response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedUser),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.status === 401) {
            
            const tokens = await refreshToken();

            if (tokens.accessToken) {
                
                response = await fetch(`${API_URL}/users/${userId}`,
                    {
                        method: 'PATCH',
                        body: JSON.stringify(updatedUser),
                        credentials: 'include',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        }
                    });
            } else {
                throw new Error('Refresh token failed. Please log in again.'); 
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error; 
    }
};

export const fetchUserLogin = async (username, token) => {
    try {
        const response = await fetch(`${API_URL}/userLogin?username=${username}&token=${token}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const checkUserLogin = async (data, token) => {


    try {

        const response = await fetch(`${API_URL}/userLogin`, {
            method: 'POST',
            body: JSON.stringify({ data, token }),
            credentials: 'include', 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const getStatuses = async () => {
    try {
        const response = await fetch(`${API_URL}/statuses`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};



export const refreshToken = async () => {
    try {
        const response = await fetch(`${API_URL}/userLogin/refreshToken`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (!response.ok) {
            throw new Error(`Failed to refresh token: ${response.status}`);
        }

        const tokens = await response.json(); 

     
        return tokens;
    } catch (error) {
        throw new Error('Refresh token failed.'); 
}}

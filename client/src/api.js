export const fetchProducts = async (query) => {
    try {
        const response = await fetch(`http://localhost:8080/products?${query}`);
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
        const response = await fetch(`http://localhost:8080/products/${productId}`);
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

        const response = await fetch('http://localhost:8080/products', {
            method: 'POST',
            body: data,
            headers: {
                // 'Content-Type': 'multipart/form-data', // Don't set this manually when using FormData
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error uploading product:', error);
        alert('Error uploading product');
    }
}

export const updateProduct = async (edit, id) => {
    try {
        const response = await fetch(`http://localhost:8080/products/${id}`, {
            method: 'PATCH',
            body: edit,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error updating product:', error);
        alert('Error updating product');
    }
}

export const removeProduct = async (productId) => {
    try {
        const response = await fetch(`http://localhost:8080/products/${productId}`, {
            method: 'DELETE',

        });
console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error updating product:', error);
        alert('Error updating product');
    }
}

export const fetchUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const addUser = async (user) => {
    try {
        console.log(updateUser);
        const response = await fetch(`http://localhost:8080/users`, {
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
        console.log(updateUser);
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedUser),
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

export const fetchUserLogin = async (username) => {
    try {
        const response = await fetch(`http://localhost:8080/userLogin?username=${username}`);
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
        const response = await fetch('http://localhost:8080/userLogin', {
            method: 'POST',
            body: JSON.stringify({ data, token }),
            //credentials: 'include', // Send cookies with the request
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
        const response = await fetch(`http://localhost:8080/statuses`);
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
        const response = await fetch(`http://localhost:8080/categories`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const POINT_URL = "https://localhost:8083/point";
const LOGOUT_URL = "https://localhost:8083/logout";
const LOGIN_PAGE_URL = "https://localhost:8083/login";

let hasRequest = false;

export async function logout() {
    if (hasRequest) {
        return ;
    }
    hasRequest = true;
    try {
        return await fetch(LOGOUT_URL, {
            method: "POST",
            headers: { Authorization: localStorage.getItem("token") },
            credentials: "include",
            body: JSON.stringify({})
        });
    } finally {
        hasRequest = false;
    }
}

export async function checkCredentials() {
    return await fetch(LOGIN_PAGE_URL, {
        headers: { Authorization: localStorage.getItem("token") },
        credentials: "include",
    })
}

export async function login(formData) {
    const requestOptions = {
        method: 'POST',
        body: formData,
        credentials: 'include'
    };

    let response = await fetch(LOGIN_PAGE_URL, requestOptions);
    let body = await response.json();

    if (body.username !== null && body.username !== undefined) {
        localStorage.setItem("token", response.headers.get("Authorization"));
        localStorage.setItem("username", body.username);
    }
    return body;
}

export async function getPointsRequest(){
    if (hasRequest) {
        return;
    }
    hasRequest = true;
    try {
        let getRequest = await fetch(POINT_URL, {
            method: 'GET',
            headers: { Authorization: localStorage.getItem("token") },
            credentials: "include",
        });
        if (getRequest.ok) {
            return await getRequest.json();
        } else if (getRequest.status === 401 || getRequest.status === 403) {
            throw new Error();
        }
    } finally {
        hasRequest = false;
    }
}

export async function createAndGetPoints(formData) {
    if (hasRequest) {
        return;
    }
    hasRequest = true;
    try {
        let postRequest = await fetch(POINT_URL, {
            method : 'POST',
            body : formData,
            headers: { Authorization: localStorage.getItem("token") },
            credentials: "include",
        });

        if (postRequest.ok) {
            let getRequest = await fetch(POINT_URL, {
                headers: { Authorization: localStorage.getItem("token") },
                credentials: "include",
            });
            if (getRequest.ok) {
                return await getRequest.json();
            }
        }
    } finally {
        hasRequest = false;
    }
}

export async function updateAndGetPoints(formData) {
    if (hasRequest) {
        return;
    }
    hasRequest = true;
    try {
        let postRequest = await fetch(POINT_URL, {
            method : 'PUT',
            body : formData,
            headers: { Authorization: localStorage.getItem("token") },
            credentials: "include",
        });

        if (postRequest.ok) {
            let getRequest = await fetch(POINT_URL, {
                headers: { Authorization: localStorage.getItem("token") },
                credentials: "include",
            });
            if (getRequest.ok) {
                return await getRequest.json();
            }
        }
    } finally {
        hasRequest = false;
    }
}

export async function deleteAndGetPoints(formData) {
    if (hasRequest) {
        return;
    }
    hasRequest = true;
    try {
        let postRequest = await fetch(POINT_URL, {
            method : 'DELETE',
            body : formData,
            headers: { Authorization: localStorage.getItem("token") },
            credentials: "include",
        });

        if (postRequest.ok) {
            let getRequest = await fetch(POINT_URL, {
                headers: { Authorization: localStorage.getItem("token") },
                credentials: "include",
            });
            if (getRequest.ok) {
                return await getRequest.json();
            }
        }
    } finally {
        hasRequest = false;
    }
}
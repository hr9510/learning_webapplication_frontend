export const GetCourses = async () => {
  try {
    const res = await fetch("http://localhost:5000/getCourses", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type" : "application/json"
      }
    });
    const data = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error(data.message);
      }
      throw new Error(data.message);
    }


    return data.course_list;
  }
  catch (error) {
    console.error("Error fetching courses:", error.message);
    return error.message;
  }
};


export async function Updating(name, data, id) {
  const fetching = await fetch("http://localhost:5000/updateCourses", {
    method: 'POST',
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [name]: data,
      id: id
    })
  });
  return fetching.json();
}

export async function GetMessage() {
  try {
    const data = await fetch("http://localhost:5000/getQuestions", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return data.json()
  }
  catch (err) {
    return data.message
  }
}
export const refreshingToken = async () => {
    try {
      const res = await fetch("http://localhost:5000/refresh", {
        method: "POST",
        credentials : "include"
      })

      if (res.ok) {
        return "GOOD"
      } else {
        alert("Session expired, please login again")
        window.location.href = "/Account"
      }
    } catch (err) {
      console.error("Refresh error:", err)
    }
  }


 export const handleLogout = async (router) => {
      const Fetching = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include"
      })
      const res = Fetching.json()
      localStorage.removeItem("email")
      router.push("/")
      alert(res.message || "Logged out successfully ✅")
  }
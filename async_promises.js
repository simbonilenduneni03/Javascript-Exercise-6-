const usersDB = {
  1: { name: "Simbonile Nduneni", email: "nduneisimbonile429@gmail.com", registrationDate: "01/02/2003" },
  2: { name: "Zotsho Nduneni", email: "Zotshonduneni@gmail.com", registrationDate: "05/06/2003" },
  3: { name: "Noluntu Mkhetho", email: "Noluntumkhetho@gmail.com", registrationDate: "12/11/2010" },
  4: { name: "Mzikabowo Nkosi", email: "Mzika@gmail.com", registrationDate: "23/09/2013" }
}
const fetchUserData = (id) =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
             if (id > 0 && usersDB[id]) {
              resolve({ id, ...usersDB[id] });
            } else {
              reject(new Error("Invalid userId"));
            }
        }, 1000)
    );
  const fetchUserPosts = (id) =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            id > 0
                ?   resolve([
                        { id: 1, title: "Hello", content: "First post!", user: id},
                        { id: 2, title: "Update", content: "Second post!", user: id },
                    ])
                : reject(new Error("Posts not found"));
        }, 500)
    );
const fetchUserAndPposts = async (id) => {
  try {
    const user = await fetchUserData(id);
    const posts = await fetchUserPosts(id);
    return { user, posts };
  } catch (err) {
    console.error("Error:", err.message);
  }
};
const fetchMultipleUsers = async (ids) =>
  (await Promise.all(ids.map((id) => fetchUserData(id).catch(() => null)))).filter(Boolean);
const fetchUsersAndPosts = async (ids) => {
  const users = await fetchMultipleUsers(ids);
  const posts = await Promise.all(users.map((u) => fetchUserPosts(u.id).catch(() => [])));
  return users.map((u, i) => ({ user: u, posts: posts[i] }));
};
fetchUserAndPposts(1).then((data) => console.log("Single User:", data));
fetchMultipleUsers([1, 2, 3, 4]).then((users) => console.log("Multiple Users:", users));
fetchUsersAndPosts([1, 2]).then((data) => console.log("Users + Posts:", data));

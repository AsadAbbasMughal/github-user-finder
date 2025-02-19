let searchUser = document.getElementById('searchUser')! as HTMLInputElement;
let searchBtn = document.getElementById('searchBtn')! as HTMLButtonElement; 

searchBtn.addEventListener('click', async () => {

    
    let username = searchUser.value.trim(); 

    if (!username) {
        alert('Enter the username');
        return;
    }

    const response = await fetch(`https://api.github.com/users/${username}`);
    let data = await response.json();
    console.log(data);

    if (data.message === 'Not Found') {
        alert('User not found');
        return;
    }

    document.getElementById('profile')?.classList.remove('hidden');
    (document.getElementById('avatar') as HTMLImageElement).src = data.avatar_url;
    (document.getElementById('name') as HTMLElement).textContent = data.name || data.login;
    (document.getElementById('bio') as HTMLElement).textContent = data.bio || 'No bio available';
    (document.getElementById('profileLink') as HTMLAnchorElement).href = data.html_url;
    (document.getElementById('profileLink') as HTMLAnchorElement).textContent = 'View Profile';
    (document.getElementById('followers') as HTMLElement).textContent = `Followers: ${data.followers}`;
    (document.getElementById('following') as HTMLElement).textContent = `Following: ${data.following}`;
    (document.getElementById('repos') as HTMLElement).textContent = `Repos: ${data.public_repos}`;
});

async function fetchAndDisplay(url: string, containerId: string, listId: string) {
    let username = searchUser.value.trim();
    if (!username) return;

    const response = await fetch(`https://api.github.com/users/${username}/${url}`);
    const data = await response.json();

    const container = document.getElementById(listId);
    if (!container) return;

    container.innerHTML = '';

    data.forEach((user: any) => {
        const li = document.createElement('li');
        li.innerHTML = `<div class="flex items-center space-x-2">
            <img src="${user.avatar_url}" class="w-10 h-10 rounded-full" alt="Avatar">
            <a href="${user.html_url}" target="_blank" class="text-blue-600 hover:underline">${user.login}</a>
        </div>`;
        container.appendChild(li);
    });

    document.getElementById('repoList')?.classList.add('hidden');
    document.getElementById('followersList')?.classList.add('hidden');
    document.getElementById('followingList')?.classList.add('hidden');

    document.getElementById(containerId)?.classList.remove('hidden');
}

document.getElementById('followers')?.addEventListener('click', async () => {
    await fetchAndDisplay('followers', 'followersList', 'followersContainer');
});

document.getElementById('following')?.addEventListener('click', async () => {
    await fetchAndDisplay('following', 'followingList', 'followingContainer');
});

document.getElementById('repos')?.addEventListener('click', async () => {
    await fetchAndDisplay('repos', 'repoList', 'repoContainer');
});

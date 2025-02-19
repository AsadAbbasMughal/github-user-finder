"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
let searchUser = document.getElementById('searchUser');
let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let username = searchUser.value.trim();
    if (!username) {
        alert('Enter the username');
        return;
    }
    const response = yield fetch(`https://api.github.com/users/${username}`);
    let data = yield response.json();
    console.log(data);
    if (data.message === 'Not Found') {
        alert('User not found');
        return;
    }
    (_a = document.getElementById('profile')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    document.getElementById('avatar').src = data.avatar_url;
    document.getElementById('name').textContent = data.name || data.login;
    document.getElementById('bio').textContent = data.bio || 'No bio available';
    document.getElementById('profileLink').href = data.html_url;
    document.getElementById('profileLink').textContent = 'View Profile';
    document.getElementById('followers').textContent = `Followers: ${data.followers}`;
    document.getElementById('following').textContent = `Following: ${data.following}`;
    document.getElementById('repos').textContent = `Repos: ${data.public_repos}`;
}));
function fetchAndDisplay(url, containerId, listId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        let username = searchUser.value.trim();
        if (!username)
            return;
        const response = yield fetch(`https://api.github.com/users/${username}/${url}`);
        const data = yield response.json();
        const container = document.getElementById(listId);
        if (!container)
            return;
        container.innerHTML = '';
        data.forEach((user) => {
            const li = document.createElement('li');
            li.innerHTML = `<div class="flex items-center space-x-2">
            <img src="${user.avatar_url}" class="w-10 h-10 rounded-full" alt="Avatar">
            <a href="${user.html_url}" target="_blank" class="text-blue-600 hover:underline">${user.login}</a>
        </div>`;
            container.appendChild(li);
        });
        (_a = document.getElementById('repoList')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('followersList')) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
        (_c = document.getElementById('followingList')) === null || _c === void 0 ? void 0 : _c.classList.add('hidden');
        (_d = document.getElementById(containerId)) === null || _d === void 0 ? void 0 : _d.classList.remove('hidden');
    });
}
(_a = document.getElementById('followers')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchAndDisplay('followers', 'followersList', 'followersContainer');
}));
(_b = document.getElementById('following')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchAndDisplay('following', 'followingList', 'followingContainer');
}));
(_c = document.getElementById('repos')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchAndDisplay('repos', 'repoList', 'repoContainer');
}));

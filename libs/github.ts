export async function getFeaturedRepos() {
    const res = await fetch(
        "https://api.github.com/users/aisyahrr/repos?sort=updated&per_page=3",
        { next: { revalidate: 3600 } }
    );
    return res.json();
}
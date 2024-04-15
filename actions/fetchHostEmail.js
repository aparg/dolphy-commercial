export const fetchHostEmail = async (hostname) => {
  const url = `https://api.condomonk.ca/api/domain-detail/?domain=${hostname}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const email = data?.contact_email;
    return email;
  } catch (err) {
    throw new Error(err);
  }
};

export function isAdmin() {
  const usuarioString = localStorage.getItem('usuarioTwitter');
  if (!usuarioString) {
    return false;
  } else {
    const usuario = JSON.parse(usuarioString);
    if (usuario.rol !== 'admin') return false;
    else return true;
  }
}

export function isLogged() {
  const usuarioString = localStorage.getItem('usuarioTwitter');
  if (!usuarioString) {
    return false;
  } else {
    const usuario = JSON.parse(usuarioString);
    if (usuario.rol === 'admin' || usuario.rol==='user') return true;
    else return false;
  }
}
export function Avatar() {
  return (
    <img
      src="/assets/user.png"
      alt="User avatar"
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />
  );
}

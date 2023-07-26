const Title = ({ amount }) => {
  const month = new Date().toLocaleDateString();

  return (
    <>
      <div className="title">
        <h1>{month}</h1>
        <h2>{amount} CAL</h2>
        <p></p>
      </div>
    </>
  );
};

export default Title;

const Title = ({ amount }) => {
  const month = new Date().toLocaleString('en-US', { month: 'long' });
  const formattedAmount = amount.toFixed(2).toLocaleString();

  return (
    <div className="bg-rouse-200">
      <div className="title">
        {/* <h1>{month}</h1> */}
        <h2>${formattedAmount}</h2>
      </div>
    </div>
  );
};

export default Title;

const Paginate = ({ totalData, itemPerPage, changePage }) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginate">
      {pageNumbers &&
        pageNumbers.map((pageNum, index) => {
          return (
            <div key={index}>
              <button onClick={() => changePage(pageNum)}>{pageNum}</button>
            </div>
          );
        })}
    </div>
  );
};
export default Paginate;

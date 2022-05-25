import React from "react";
import LoadingTableRow from "../../Loading/LoadingTableRow.js";

/**
 * Tabela de registos genérica
 * @param {Array<Object>} records Registos
 * @param {Array<string>} headers Table Headers
 * @param {React.Component} TableRowComponent Table Row Customizado
 * @param {Object} tableRowComponentProps Props do table row
 * @param {boolean} loading Opcional, quando é verdadeiro a tabela não renderiza as linhas e apresenta um loading spinner
 * @returns {JSX.Element}
 */
function RecordTable({
  records,
  headers,
  TableRowComponent,
  tableRowComponentProps,
  loading = false,
}) {
  return (
    <table className="table table-striped align-middle">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th scope="col" key={index}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading && <LoadingTableRow />}
        {!loading &&
          records.map((record, index) => (
            <TableRowComponent
              key={index + 1}
              index={index + 1}
              record={record}
            />
          ))}
      </tbody>
    </table>
  );
}

export default RecordTable;

import React, { useMemo, useState } from "react";
import {
    cookRowCountries,
    filterRows,
    paginateRows,
    sortRows,
} from "./../utils/helpers/index";
import InfoModal from "./InfoModal";
import { Pagination } from "./Pagination";

const TableContent = (props) => {
    const { countries } = props;

    const [activePage, setActivePage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
    const [openModal, setOpenModal] = useState(false);
    const [countryCode, setCountryCode] = useState("");

    const columns = [
        { accessor: "country", label: "Country" },
        { accessor: "TotalConfirmed", label: "Total confirmed cases" },
        { accessor: "TotalDeaths", label: "Number of deaths" },
        { accessor: "TotalRecovered", label: "Number of recovered cases" },
    ];

    const filteredRows = useMemo(
        () => filterRows(cookRowCountries(countries), filters),
        [cookRowCountries(countries), filters]
    );
    const sortedRows = useMemo(
        () => sortRows(filteredRows, sort),
        [filteredRows, sort]
    );
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

    const count = filteredRows.length;
    const totalPages = Math.ceil(count / rowsPerPage);

    const handleSort = (accessor) => {
        setActivePage(1);
        setSort((prevSort) => ({
            order:
                prevSort.order === "asc" && prevSort.orderBy === accessor
                    ? "desc"
                    : "asc",
            orderBy: accessor,
        }));
    };

    const clearAll = () => {
        setSort({ order: "asc", orderBy: "id" });
        setActivePage(1);
        setFilters({});
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => {
                            const sortIcon = () => {
                                if (column.accessor === sort.orderBy) {
                                    if (sort.order === "asc") {
                                        return "⬆️";
                                    }
                                    return "⬇️";
                                } else {
                                    return "️↕️";
                                }
                            };
                            return (
                                <th key={column.accessor}>
                                    <span>{column.label}</span>
                                    <button
                                        onClick={() =>
                                            handleSort(column.accessor)
                                        }
                                    >
                                        {sortIcon()}
                                    </button>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {calculatedRows.map((row) => {
                        return (
                            <tr
                                key={row.country}
                                onClick={() => {
                                    setCountryCode(row.countryCode);
                                    setOpenModal(true);
                                }}
                            >
                                {columns.map((column) => {
                                    if (column.format) {
                                        return (
                                            <td key={column.accessor}>
                                                {column.format(
                                                    row[column.accessor]
                                                )}
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={column.accessor}>
                                            {row[column.accessor]}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Pagination
                activePage={activePage}
                count={count}
                rowsPerPage={rowsPerPage}
                totalPages={totalPages}
                setActivePage={setActivePage}
            />
            <div className="select-row">
                <label>Choose number of row: </label>
                <select
                    name="number-row"
                    id="row"
                    onChange={(e) => setRowsPerPage(e.target.value)}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
            <button id="clear-btn" onClick={clearAll}>
                Clear all filter
            </button>
            {openModal && (
                <InfoModal
                    setOpenModal={setOpenModal}
                    countryCode={countryCode}
                />
            )}
        </div>
    );
};

export default React.memo(TableContent);

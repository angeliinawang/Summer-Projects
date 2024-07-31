import React from 'react';
import './Summary.css';

function Summary() {
    return (
        <table className="summaryTable">
            <thead>
                <tr>
                    <td>Total Income</td>
                    <td>Total Expenses</td>
                    <td>Net Income Loss</td>
                </tr>
            </thead>
        </table>
    )
}

export default Summary;
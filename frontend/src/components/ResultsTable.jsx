import './ResultsTable.css'

export function ResultsTable({recentResults}) {
    
    // MARK: Function for generating the rows of table data
    function generateTableData(results) {

        // If there aren't any results, then we don't generate any table data
        if (!results || results.length === 0) {
            return null;
        }

        // Otherwise, return a table row containing each of the properties
        return results.map((result, index) => (
            <tr key={index}>
                <td className='centered-text'>{result.pageTitle}</td>
                <td>{result.metaDescription}</td>
                <td className="h1-tags">
                    <ul>
                        {result.headerArray.map((header) => (<li>{header}</li>))}
                    </ul>
                </td>
                <td><a href={result.screenshotUrl}><img className="table-data-image" src={result.screenshotUrl}></img></a></td>
                <td className="url-container"><a href={result.url}>{result.url}</a></td>
            </tr>
        ));
    }
    
    return (
        <div id="results-table-container">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>H1 Tags</th>
                        <th>Screenshot Image</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {generateTableData(recentResults)}
                </tbody>
            </table>
        </div>
    )
}
import './RecentSearches.css'

export function RecentSearches({recentlySearched}) {
    
    return (
        <div id="recently-searched-container">
            <table>
                <thead>
                    <tr>
                        <th>Recently Searched</th>
                    </tr>
                </thead>
                <tbody>
                    {recentlySearched.length > 0 ? (recentlySearched.map((search, index) => {
                            if (index < 3) {
                                return (
                                    <tr>
                                        <td className="url-container">{search}</td>
                                    </tr>
                                )
                            }
                        })) : null}
                </tbody>
            </table>
        </div>
    )
}
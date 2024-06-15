import React from "react"
import ContentLoader from "react-content-loader"

export default function Skeleton(props) { // react skeleton
    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={464}
            viewBox="0 0 280 464"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <circle cx="140" cy="128" r="130" />
            <rect x="0" y="270" rx="10" ry="10" width="280" height="25" />
            <rect x="218" y="301" rx="0" ry="0" width="1" height="8" />
            <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
            <rect x="0" y="425" rx="10" ry="10" width="90" height="32" />
            <rect x="131" y="417" rx="25" ry="25" width="150" height="46" />
        </ContentLoader>
    )
}
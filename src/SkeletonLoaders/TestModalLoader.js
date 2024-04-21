import React from 'react'
import ContentLoader from 'react-content-loader'

export const SliderLoader = () => {
    return (
        <ContentLoader viewBox="0 0 100 150">
            <rect x="0" y="0" rx="0" ry="0" width="270" height="150" />
        </ContentLoader>
    )
}

export const SliderDescriptionLoader = () => {
    return (
        <div className='md:pl-4'>
            <ContentLoader viewBox="0 0 100 150">
                <rect x="0" y="0" rx="0" ry="0" width="100" height="8" />
                <rect x="0" y="10" rx="0" ry="0" width="100" height="5" />
                <rect x="0" y="18" rx="0" ry="0" width="100" height="5" />
                <rect x="0" y="25" rx="0" ry="0" width="100" height="5" />
                <rect x="0" y="32" rx="0" ry="0" width="100" height="10" />
                <rect x="0" y="44" rx="0" ry="0" width="100" height="10" />
                <rect x="0" y="56" rx="0" ry="0" width="100" height="10" />
                <rect x="0" y="68" rx="0" ry="0" width="100" height="5" />
                <rect x="0" y="74" rx="0" ry="0" width="100" height="5" />
                <rect x="0" y="80" rx="0" ry="0" width="100" height="5" />
                <rect x="0" y="86" rx="0" ry="0" width="100" height="5" />
                <rect x="0" y="93" rx="0" ry="0" width="100" height="25" />
                <rect x="0" y="120" rx="0" ry="0" width="100" height="25" />
            </ContentLoader>
        </div>
    )
}

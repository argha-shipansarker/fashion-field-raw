import React from 'react'
import ContentLoader from 'react-content-loader'

export const CarouselLoader = () => {
    return (
        <ContentLoader viewBox="0 0 100 200">
            <rect x="0" y="0" rx="0" ry="0" width="270" height="130" />

            <rect x="0" y="133" rx="0" ry="0" width="30" height="37" />
            <rect x="35" y="133" rx="0" ry="0" width="30" height="37" />
            <rect x="70" y="133" rx="0" ry="0" width="30" height="37" />

        </ContentLoader>
    )
}

export const BreadCrumbsLoader = () => {
    return (
        <ContentLoader viewBox="0 0 100 100" className='hidden md:block'>
            <rect x="0" y="3" rx="0" ry="0" width="7" height="1.5" />
            <rect x="8" y="3" rx="0" ry="0" width="10" height="1.5" />
            <rect x="19" y="3" rx="0" ry="0" width="13" height="1.5" />
            <rect x="33" y="3" rx="0" ry="0" width="17" height="1.5" />
            <rect x="51" y="3" rx="0" ry="0" width="19" height="1.5" />

        </ContentLoader>
    )
}

export const ProductNameLoader = () => {
    return (
        <div className='h-10 mb-4.75'>
            <ContentLoader viewBox="0 0 100 100">
                <rect x="0" y="0.5" rx="0" ry="0" width="90" height="4" />
            </ContentLoader>
        </div>

    )
}

export const ReviewLoader = () => {
    return (
        <div className='h-10 ml-3.25'>
            <ContentLoader>
                <rect x="0" y="15" rx="0" ry="0" width="100" height="14" />
            </ContentLoader>
        </div>
    )
}

export const ProductGeneralInfoLoader = () => {
    return (
        <div className='h-25 mt-9'>
            <ContentLoader>
                <rect x="0" y="0" rx="0" ry="0" width="80" height="14" />
                <rect x="100" y="0" rx="0" ry="0" width="80" height="14" />
                <rect x="0" y="20" rx="0" ry="0" width="80" height="14" />
                <rect x="100" y="20" rx="0" ry="0" width="80" height="14" />
                <rect x="0" y="40" rx="0" ry="0" width="80" height="14" />
                <rect x="100" y="40" rx="0" ry="0" width="80" height="14" />
                <rect x="0" y="60" rx="0" ry="0" width="80" height="14" />
                <rect x="100" y="60" rx="0" ry="0" width="80" height="14" />
            </ContentLoader>
        </div>
    )
}

export const ProductPriceLoader = () => {
    return (
        <div className='h-8 w-46.5 pt-2'>
            <ContentLoader>
                <rect x="0" y="0" rx="0" ry="0" width="150" height="20" />
            </ContentLoader>
        </div>
    )
}


import React, { useEffect } from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const SizeChartModal = props => {

    const { modal, setModal, sizeData } = props

    useEffect(() => {
        // console.log(sizeData)
    }, [sizeData])

    const onClose = () => {
        setModal(false)
    }


    return (
        <Modal open={modal} onClose={onClose} blockScroll={false} center={true}>

            {/* <div>
                <p className='font-Poppins font-bold text-xl text-logobarElementBG mb-4'>Size Chart</p>
            </div> */}

            <div className='grid grid-cols-2 gap-6' style={{ height: 600 }}>
                <div className='sizeTable'>
                    <p className='font-Poppins font-bold text-xl text-logobarElementBG mb-4'>Size Chart</p>
                    <p dangerouslySetInnerHTML={{ __html: sizeData?.chart }} />
                </div>

                <div >
                    <p className='font-Poppins font-bold text-xl text-logobarElementBG mb-4'>Guide Line</p>
                    <p dangerouslySetInnerHTML={{ __html: sizeData?.content }} />
                </div>

            </div>

        </Modal>
    )
}

export default SizeChartModal

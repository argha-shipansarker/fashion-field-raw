import React from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { closeAddedToCartNotificationModal } from "../ReduxStore/CartSystem/CartStore"

const AddedToCartNotification = () => {
    const { addedToCartNotification } = useSelector(state => state.testCart)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleClosingModal = () => {
        dispatch(closeAddedToCartNotificationModal())
    }
    return (
        <Modal open={addedToCartNotification} onClose={handleClosingModal} blockScroll={false}>
            <div className='flex flex-col px-2'>
                <p className='font-Poppins font-semibold'>Product is added to the cart</p>
                <div className='flex justify-between mt-4'>
                    <button className="font-Poppins text-xs px-2 py-2 border-1 border-logobarElementBG text-logobarElementBG hover:bg-logobarElementBG hover:text-white rounded-lg" onClick={() => { history.push("/cart"); dispatch(closeAddedToCartNotificationModal()) }}>
                        Go to Cart
                    </button>
                    <button className="font-Poppins text-xs px-2 py-2 border-1 border-logobarElementBG text-logobarElementBG hover:bg-logobarElementBG hover:text-white rounded-lg" onClick={() => dispatch(closeAddedToCartNotificationModal())}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default AddedToCartNotification
import React from 'react'
import MakePayment from '@/components/MakePayment'
import FormLayout from '@/components/FormLayout';

const payment = ({ params }) => {
    const userEmail = decodeURIComponent(params.userEmail);
    const profEmail = decodeURIComponent(params.profEmail);

    return (
        <div className='h-full text-2xl text-center'>
            {/* <h4>Payment page</h4> */}
            <FormLayout page={"payment"} image="/assets/paymentImg.png" setForm={<MakePayment userEmail={userEmail} profEmail={profEmail} />} />

        </div>
    )
}

export default payment;
import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class PayCreditCard extends Component {
    render() {
        const onSuccess = (payment) => {
            // console.log("Payment successful!", payment);
            this.props.onResultPay(null, null, payment);
        }

		const onCancel = (data) => {
			// console.log('Payment cancelled!', data);
            this.props.onResultPay(null, data, null);
		}

		const onError = (err) => {
			// console.log("Error!", err);
            this.props.onResultPay(err, null, null);
		}

		let env = 'sandbox'; // 'sandbox' or 'production'
		let currency = 'USD'; 
		let total = this.props.total;  // this is the total amount (based on currency) to charge
		// https://developer.paypal.com/docs/classic/api/currency_codes/

		const client = {
			sandbox:    'AXt_ETHxDyNcSC2rtTtrvOmB_tge1H2KrnOatAoAM7IlbZfX7iaqrgDbGVQf1dL4__ZqU-By_mKoUB1M',
			production: 'YOUR-PRODUCTION-APP-ID',
		}

        return (
            <div>
                <PaypalExpressBtn 
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} 

                // Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
                style={{
                    size: 'large',
                    color: 'gold',
                    tagline: 'false',
                    // fundingicons: 'true',
                    label: 'paypal'
                }}
            />
            </div>
        );
    }
}

export default PayCreditCard;
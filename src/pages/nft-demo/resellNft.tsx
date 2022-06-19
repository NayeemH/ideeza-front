import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Web3Modal from 'web3modal';
import NFTMarketplace from '@features/blockchain/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function ResellNFT() {
	const marketplaceAddress = '0xd88d2456f91061108933e7142dff7379D1E81185'; //process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

	const [formInput, updateFormInput] = useState({ price: '', image: '' });
	const router = useRouter();
	const id: any = router.query.id;
	const tokenURI: any = router.query.tokenURI;
	const { image, price } = formInput;

	useEffect(() => {
		fetchNFT();
	}, [id]);

	async function fetchNFT() {
		if (!tokenURI) return;
		const meta = await axios.get(tokenURI);
		updateFormInput((state) => ({ ...state, image: meta.data.image }));
	}

	async function listNFTForSale() {
		if (!price) return;
		const web3Modal = new Web3Modal();
		// console.log('1. web3Modal-------------success', web3Modal)

		let connection = null;
		try {
			connection = await web3Modal.connect();
			// console.log('2.1. connection-------------success', connection)
		} catch (error: any) {
			// console.log('2.2. connection-------------error', error)
			return toast.error(error || 'Error web3Modal.connect');
		}

		const provider = new ethers.providers.Web3Provider(connection);
		// console.log('3. provider-------------success', provider)

		const signer = provider.getSigner();
		// console.log('4. signer-------------success', signer)

		const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether');
		// console.log('5. priceFormatted-------------success', priceFormatted)

		// console.log('6.01. marketplaceAddress, NFTMarketplace.abi, signer----', marketplaceAddress, NFTMarketplace.abi, signer)
		const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
		// console.log('6.2. contract----------Success', contract)

		let listingPrice = null;
		try {
			listingPrice = await contract.getListingPrice();
			listingPrice = listingPrice.toString();
			// console.log('7.1. listingPrice get-------------success', listingPrice)
		} catch (error: any) {
			// console.log('7.2. listingPrice get-------------error', error)
			return toast.error(error || 'Error listingPrice get');
		}

		let transaction = null;

		try {
			transaction = await contract.resellToken(id, priceFormatted, { value: listingPrice });
			await transaction.wait();
			// console.log('8.1. transaction contract.resellToken-------------success', transaction)
		} catch (error: any) {
			// console.log('8.2. transaction contract.resellToken-------------error', error)
			return toast.error(error || 'Error listingPrice get');
		}

		// console.log(transaction);
		location.reload();
	}

	return (
		<div className="p-4 w-96 my-10 mx-auto">
			<div className="mb-4">
				<input
					placeholder="Asset Price in Matic"
					className="p-4 w-80 rounded"
					onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
				/>
			</div>
			<div className="mb-4">{image}</div>
			<div className="mb-4">
				<button
					className="bg-primary text-base text-white px-8 py-4 rounded"
					onClick={listNFTForSale}
				>
					List NFT
				</button>
			</div>
		</div>
	);
}

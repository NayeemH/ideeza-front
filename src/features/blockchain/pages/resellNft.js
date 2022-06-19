import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Web3Modal from 'web3modal';

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

export default function ResellNFT() {
	const [formInput, updateFormInput] = useState({ price: '', image: '' });
	const router = useRouter();
	const { id, tokenURI } = router.query;
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
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether');
		let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
		let listingPrice = await contract.getListingPrice();

		listingPrice = listingPrice.toString();
		let transaction = await contract.resellToken(id, priceFormatted, { value: listingPrice });
		await transaction.wait();

		console.log(transaction);
		location.reload();
	}

	return (
		<div>
			<div>
				<input
					placeholder="Asset Price in Matic"
					onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
				/>
				{image}
				<button onClick={listNFTForSale}>List NFT</button>
			</div>
		</div>
	);
}

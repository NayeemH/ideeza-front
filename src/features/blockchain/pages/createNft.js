import { useState } from 'react';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import Web3Modal from 'web3modal';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

export default function CreateItem() {
	const [fileUrl, setFileUrl] = useState(null);
	const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });

	// convert image to URL
	async function onChange(e) {
		const file = e.target.files[0];
		try {
			const added = await client.add(file, {
				progress: (prog) => console.log(`received: ${prog}`),
			});
			const url = `https://ipfs.infura.io/ipfs/${added.path}`;
			setFileUrl(url);
		} catch (error) {
			console.log('Error uploading file: ', error);
		}
	}

	// upload to ipfs and return ipfs url
	async function uploadToIPFS() {
		const { name, description, price } = formInput;
		if (!name || !description || !price || !fileUrl) return;
		/* first, upload to IPFS */
		const data = JSON.stringify({
			name,
			description,
			image: fileUrl,
		});
		try {
			const added = await client.add(data);
			const url = `https://ipfs.infura.io/ipfs/${added.path}`;
			/* after file is uploaded to IPFS, return the URL to use it in the transaction */
			return url;
		} catch (error) {
			console.log('Error uploading file: ', error);
		}
	}

	async function listNFTForSale() {
		const url = await uploadToIPFS();
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		/* next, create the item */
		const price = ethers.utils.parseUnits(formInput.price, 'ether');
		let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
		let listingPrice = await contract.getListingPrice();
		listingPrice = listingPrice.toString();
		let transaction = await contract.createToken(url, price, { value: listingPrice });
		await transaction.wait();

		console.log(transaction);
		location.reload();
	}

	return (
		<div>
			<h1>Create NFT</h1>
			<div>
				<input
					placeholder="Asset Name"
					onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
				/>
				<textarea
					placeholder="Asset Description"
					onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
				/>
				<input
					placeholder="Asset Price in Matic"
					onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
				/>
				<input
					type="file"
					name="Asset"
					onChange={onChange}
				/>
				{fileUrl}
				<button onClick={listNFTForSale}>Create NFT</button>
			</div>
		</div>
	);
}

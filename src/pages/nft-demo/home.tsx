import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import NFTMarketplace from '@features/blockchain/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import { toast } from 'react-toastify';

export default function Home() {
	const marketplaceAddress = '0xd88d2456f91061108933e7142dff7379D1E81185'; //process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

	const [nfts, setNfts] = useState<any>([]);
	const [loadingState, setLoadingState] = useState('not-loaded');

	useEffect(() => {
		loadNFTs();
	}, []);

	async function loadNFTs() {
		/* create a generic provider and query for unsold market items */
		const provider = new ethers.providers.JsonRpcProvider();
		// console.log('1.1. provider------Success', provider)

		// console.log('1.02. marketplaceAddress, NFTMarketplace.abi, provider----', marketplaceAddress, NFTMarketplace.abi, provider)
		const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider);
		// console.log('1.2. contract------Success', contract)

		let data = null;
		try {
			data = await contract.fetchMarketItems();
			// console.log('2.1. contract.fetchMarketItems------Success', data)
		} catch (error: any) {
			// console.log('2.2. contract.fetchMarketItems------failed', error)
			return toast.error(error || 'Error contract.fetchMarketItems');
		}

		/*
		 *  map over items returned from smart contract and format
		 *  them as well as fetch their token metadata
		 */
		try {
			const items = await Promise.all(
				data.map(async (i: any) => {
					const tokenUri = await contract.tokenURI(i.tokenId);
					const meta = await axios.get(tokenUri);
					const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
					const item = {
						price,
						tokenId: i.tokenId.toNumber(),
						seller: i.seller,
						owner: i.owner,
						image: meta.data.image,
						name: meta.data.name,
						description: meta.data.description,
					};
					return item;
				})
			);
			setNfts(items);
			setLoadingState('loaded');
			// console.log('3.1. get NFT List-----------Success', items)
		} catch (error: any) {
			// console.log('3.2. Error get NFT List-----------', error)
			setLoadingState('loaded');
			return toast.error(error || 'Error get NFT List');
		}
	}

	async function buyNft(nft: any) {
		/* needs the user to sign the transaction, so will use Web3Provider and sign it */
		const web3Modal = new Web3Modal();

		let connection = null;
		try {
			connection = await web3Modal.connect();
			// console.log('1.1. Connection-----------Success', connection)
		} catch (error: any) {
			// console.log('1.2. Connection-----------Error', error)
			return toast.error(error || 'Error Connection');
		}

		const provider = new ethers.providers.Web3Provider(connection);
		// console.log('2. provider-----------Success', provider)

		const signer = provider.getSigner();
		// console.log('3. signer-----------Success', signer)

		// console.log('4.01. marketplaceAddress, NFTMarketplace.abi, signer----', marketplaceAddress, NFTMarketplace.abi, signer)
		const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
		// console.log('4.2. contract------Success', contract)

		/* user will be prompted to pay the asking proces to complete the transaction */
		const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
		// console.log('5. price------Success', price)

		let transaction = null;
		try {
			transaction = await contract.createMarketSale(nft.tokenId, {
				value: price,
			});
			// console.log('6.1. transaction-----------Success', transaction)
		} catch (error: any) {
			// console.log('6.2. transaction-----------Error', error)
			return toast.error(error || 'Error transaction');
		}

		try {
			await transaction.wait();
			loadNFTs();
			// console.log('7.1. transaction.wait-----------Success', transaction)
		} catch (error: any) {
			// console.log('7.2. transaction.wait-----------Error', error)
			return toast.error(error || 'Error transaction.wait');
		}
	}

	if (loadingState === 'loaded' && !nfts.length)
		return <h1 className="text-xl p-4 w-96 my-10 mx-auto">No items in marketplace</h1>;

	return (
		<div className="p-4 w-96 my-10 mx-auto">
			<h2>Items Listed</h2>
			<div>
				{nfts.map((nft: any, i: number) => (
					<div key={i}>
						<img src={nft.image} />
						<div>
							<p>{nft.name}</p>
							<div>
								<p>{nft.description}</p>
							</div>
						</div>
						<div>
							<p>{nft.price} ETH</p>
							<button onClick={() => buyNft(nft)}>Buy</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

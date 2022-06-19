import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

export default function CreatorDashboard() {
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState('not-loaded');
	useEffect(() => {
		loadNFTs();
	}, []);
	async function loadNFTs() {
		const web3Modal = new Web3Modal({
			network: 'mainnet',
			cacheProvider: true,
		});
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
		const data = await contract.fetchItemsListed();

		const items = await Promise.all(
			data.map(async (i) => {
				const tokenUri = await contract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
				let item = {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					image: meta.data.image,
				};
				return item;
			})
		);

		setNfts(items);
		setLoadingState('loaded');
	}
	if (loadingState === 'loaded' && !nfts.length) return <h1>No NFTs listed</h1>;
	return (
		<div>
			<div>
				<h2>Items Listed</h2>
				<div>
					{nfts.map((nft, i) => (
						<div key={i}>
							<img src={nft.image} />
							<div>
								<p>Price - {nft.price} Eth</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

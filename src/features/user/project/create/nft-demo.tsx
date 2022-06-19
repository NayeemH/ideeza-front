import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import AuctionArtifact from '@features/blockchain/artifacts/Auction.json';
import AuctionManagerArtifact from '@features/blockchain/artifacts/AuctionManager.json';
import NFTArtifact from '@features/blockchain/artifacts/NFT.json';
import { toast } from 'react-toastify';

// Starts: NFT Env ---------------------
const NFT_ADDRESS: any = process.env.NEXT_PUBLIC_NFT_ADDRESS; // NFT contract address
const AUCTIONMANAGER_ADDRESS: any = process.env.NEXT_PUBLIC_AUCTION_MANAGER; // AuctionManager contract address
// Ends: NFT Env ---------------------

const NftDemo = (props: any) => {
	// Starts: NFT States ---------------------

	const [provider, setProvider] = useState<any>({});
	const [_nft, setNft] = useState<any>({});
	const [_auctionManager, setAuctionManager] = useState<any>({});
	const [signer, setSigner] = useState<any>({});
	const [currentAddress, setCurrentAddress] = useState<any>({});
	const [myItems, setMyItems] = useState<any>([]); // Items owned by the user
	const [auctionList, setAuctionList] = useState<any>([]);
	const [_auction, setAuction] = useState<any>({});
	const [activeAuction, setActiveAuction] = useState<any>(null);
	const [bidAmount, setBidAmount] = useState<number>(0);
	// ------------------------------------
	// Auction Input Stats
	const [startPrice, setStartPrice] = useState<number>(0);
	const [tokenId, setTokenId] = useState<number>(1234);
	const [minIncrement, setMinIncrement] = useState<number>(0);
	const [directBuyPrice, setDirectBuyPrice] = useState<number>(0);
	const [endTime, setEndTime] = useState<number>(0);
	// Ends: NFT States ---------------------

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// console.log('Window--------', window)
			init();
		}
	}, []);

	// Starts: NFT Functions ---------------------

	const getItems = async () => {
		let items = await _nft.myItems(); // Get the tokens owned by the user
		items = items.map((x: any) => Number(x)); // Converts BigNumber to number
		setMyItems(items);
	};

	const init = async () => {
		/* @ts-ignore */
		if (window?.ethereum) {
			// if window.ethereum is defined
			try {
				/* @ts-ignore */
				await window?.ethereum.enable();
				// console.log('window.ethereum.enabled--------')
			} catch (error: any) {
				// console.log('window.ethereum.enabled error-------', error)
				toast.error(
					error?.message + ' Or Authenticate from MetaMask.' || 'Something went wrong'
				);
				return;
			}

			// A connection to the Ethereum network
			/* @ts-ignore */
			const initProvider = new ethers.providers.Web3Provider(window?.ethereum);
			setProvider(initProvider);
			// console.log(`1.---------provider: `, provider)

			const initSigner = initProvider.getSigner(); // Holds your private key and can sign things
			setSigner(initSigner);
			// console.log(`2.---------signer: `, signer)

			// TODO: uncomment followin two lines
			const initCurrentAddress = await initSigner.getAddress(); // Set the current address
			setCurrentAddress(initCurrentAddress);
			// console.log(`3.---------theCurrentAddress: `, currentAddress)

			const initAuctionManager = new ethers.Contract( // We will use this to interact with the AuctionManager
				AUCTIONMANAGER_ADDRESS,
				AuctionManagerArtifact.abi,
				initSigner
			);
			setAuctionManager(initAuctionManager);
			// console.log(`4.---------_auctionManager: `, _auctionManager)

			const initNft = new ethers.Contract(NFT_ADDRESS, NFTArtifact.abi, initSigner); // We will use this to interact with the NFT
			setNft(initNft);
			// console.log(`5.---------_nft: `, _nft)
			// getItems(); // not necessarry while creating project
			// getAuctions(); // not necessarry while creating project
		} else {
			alert('No wallet detected'); // No wallet detected
		}
	};

	const getAuctions = async () => {
		let auctionsAddresses = await _auctionManager.getAuctions(); // get a list of auction addresses
		let auctions = await _auctionManager.getAuctionInfo(auctionsAddresses); // I'll just pass all the addresses here, you can build a pagination system if you want
		// console.log(auctions);
		let new_auctions = [];

		for (let i = 0; i < auctions.endTime.length; i++) {
			let endTime = Number(auctions.endTime[i]);
			let tokenId = Number(auctions.tokenIds[i]);
			let auctionState = Number(auctions.auctionState[i]);

			let startPrice = ethers.utils.formatEther(auctions.startPrice[i]);
			let directBuyPrice = ethers.utils.formatEther(auctions.directBuy[i]);
			let highestBid = ethers.utils.formatEther(auctions.highestBid[i]);

			let owner = auctions.owner[i];

			let newAuction = {
				endTime: endTime,
				startPrice: startPrice,
				owner: owner,
				directBuyPrice: directBuyPrice,
				tokenId: tokenId,
				highestBid: highestBid,
				auctionState: auctionState,
				auctionAddress: auctionsAddresses[i],
			};
			new_auctions.push(newAuction);
		}

		setAuctionList(new_auctions); // Update the state
	};

	// Create product/project
	const createAuction = async (data: any) => {
		let allowance_hash: any = null;
		let hash: any = null;

		if (
			!data.minIncrement || //skip this
			!data.directBuyPrice || //skip this
			!data.startPrice ||
			!data.endTime || // add a date & timepicker
			!data.tokenId // //skip this
		)
			return alert('Fill all the fields');

		try {
			const res = await _nft.approve(AUCTIONMANAGER_ADDRESS, data.tokenId); // Approve the AUCTIONMANAGER to transfer the token
			allowance_hash = res?.hash;
		} catch (error: any) {
			// console.log('nft approve error-------', error)
			toast.error(error?.message || 'Something went wrong');
		}

		if (!allowance_hash) return;
		try {
			// console.log("Transaction Approve sent! Hash:", allowance_hash);
			await provider.waitForTransaction(allowance_hash); // Wait till the transaction is mined
			// console.log("Transaction mined!");
		} catch (error: any) {
			// console.log('Transaction with allowance_hash error-------', error?.data?.message)
			toast.error(error?.data?.message || 'Something went wrong');
		}

		try {
			const res = await _auctionManager.createAuction(
				// Create an auction
				data.endTime * 60, // Converting minutes to seconds
				ethers.utils.parseEther(data.minIncrement.toString()), // Minimum increment in AVAX
				ethers.utils.parseEther(data.directBuyPrice.toString()), // Direct buy price in AVAX
				ethers.utils.parseEther(data.startPrice.toString()), // Start price in AVAX
				NFT_ADDRESS, // The address of the NFT token
				data.tokenId // The id of the token
			);
			hash = res?.hash;
			// console.log('hash generated successfully-------', hash)
		} catch (error: any) {
			// console.log('_auctionManager CreatAuction error-------', error?.data?.message)
			toast.error(error?.data?.message || 'Something went wrong');
		}

		if (!hash) return;
		try {
			console.log('Transaction sent! Hash:', hash);
			await provider.waitForTransaction(hash); // Wait till the transaction is mined
			// console.log("Transaction mined!");
			alert(`Transaction Mined! Hash: ${hash}`);
		} catch (error: any) {
			// console.log('Transaction with hash error-------', error?.data?.message)
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	const mint = async () => {
		// hash is the hash of the transaction
		let hash: any = null;
		// console.log('start Minting ------------')
		try {
			// Calling the getItem function of the contract
			const res = await _nft.getItem({
				value: ethers.utils.parseEther('0.5'), // 0.5 AVAX
			});
			hash = res?.hash;
		} catch (error: any) {
			// console.log('Mint hash error-------', error)
			toast.error(error?.data?.message || 'Something went wrong');
		}
		if (hash) {
			try {
				await provider.waitForTransaction(hash); // Wait till the transaction is mined
				// console.log("Mint Transaction mined!");
				toast.success(`Mint Transaction sent! Hash: ${hash}`);
			} catch (error: any) {
				// console.log('Mint provider.waitForTransaction error---', error)
				toast.error(error?.data?.message || 'Something went wrong');
			}
		}
	};

	const renderAuctionElement = (auction: any) => {
		let state = '';
		if (auction.auctionState === 0) {
			state = 'Open';
		}
		if (auction.auctionState === 1) {
			state = 'Cancelled';
		}
		if (auction.auctionState === 2) {
			state = 'Ended';
		}
		if (auction.auctionState === 3) {
			state = 'Direct Buy';
		}
		return (
			<div
				style={{ background: 'yellow' }}
				className="col"
			>
				<p>ID: {auction.tokenId}</p> {/* ID of the token */}
				<p>Highest Bid: {auction.highestBid || 0}</p>
				{/* Highest bid */}
				<p>Direct Buy: {auction.directBuyPrice}</p> {/* Direct buy price */}
				<p>Starting Price: {auction.startPrice}</p> {/* Starting price */}
				<p>Owner: {auction.owner}</p> {/* Owner of the token */}
				<p>
					{/* Convert timestamp to minutes */}
					End Time: {Math.round((auction.endTime * 1000 - Date.now()) / 1000 / 60)}{' '}
					{/* Time left in minutes */}
					minutes
				</p>
				<p>Auction State: {state}</p>
				<button
					className="btn-primary"
					onClick={() => onSetActiveAuction(auction)}
				>
					See More
				</button>
			</div>
		);
	};

	const placeBid = async (amount: any) => {
		if (!amount) return;
		amount = ethers.utils.parseEther(amount.toString()); // Amount in AVAX
		let { hash } = await _auction.placeBid({ value: amount }); // Place a bid
		await provider.waitForTransaction(hash); // Wait till the transaction is mined
		alert(`Transaction sent! Hash: ${hash}`); // Show the transaction hash
		onSetActiveAuction(activeAuction); // Update the active auction
	};

	const cancelAuction = async () => {
		let { hash } = await _auction.cancelAuction(); // Cancel the auction
		await provider.waitForTransaction(hash); // Wait till the transaction is mined
		alert(`Auction Canceled! Hash: ${hash}`); // Show the transaction hash
		window.location.reload(); // Reload the page
	};

	const withdrawFunds = async () => {
		let { hash } = await _auction.withdrawFunds(); // Withdraw the funds
		await provider.waitForTransaction(hash); // Wait till the transaction is mined
		alert(`Withdrawal Successful! Hash: ${hash}`); // Show the transaction hash
		window.location.reload(); // Reload the page
	};

	const withdrawToken = async () => {
		let { hash } = await _auction.withdrawToken(); // Withdraw the NFT token
		await provider.waitForTransaction(hash); // Wait till the transaction is mined
		alert(`Withdrawal Successful! Hash: ${hash}`); // Show the transaction hash
		window.location.reload(); // Reload the page
	};

	const onSetActiveAuction = async (auction: any) => {
		const activeAuction = new ethers.Contract( // Create a new instance of the contract
			auction.auctionAddress,
			AuctionArtifact.abi,
			signer
		);
		setAuction(activeAuction);

		let previousBids = await activeAuction.allBids(); // Get the bids
		let bids = []; // A list of bids
		for (let i = 0; i < previousBids[0].length; i++) {
			// Loop through the bids
			bids.push({
				// Add the bid to the list
				bidder: previousBids[0][i], // The bidder
				bid: ethers.utils.formatEther(previousBids[1][i]), // The bid
			});
		}

		auction.bids = bids; // Add the bids array to the auction object

		let auctionTokenValue = await _nft.itemValue(auction.tokenId); // Get the value of the token
		auctionTokenValue = Number(auctionTokenValue); // Convert BigNumber to number
		auction.auctionTokenValue = auctionTokenValue; // Add the value of the token to the auction object

		let highestBidder = await activeAuction.maxBidder(); // Get the highest bidder
		auction.highestBidder = highestBidder; // Add the highest bidder to the auction object

		let minIncrement = await activeAuction.minIncrement(); // Get the minimum increment
		auction.minIncrement = ethers.utils.formatEther(minIncrement); // Add the minimum increment to the auction object

		setActiveAuction(auction); // Update the state
	};

	const renderActiveAuction = () => {
		let state = '';
		if (activeAuction?.auctionState === 0) {
			// If the auction is open
			state = 'Open';
		}
		if (activeAuction?.auctionState === 1) {
			// If the auction is cancelled
			state = 'Cancelled';
		}
		if (activeAuction?.auctionState === 2) {
			// If the auction is ended
			state = 'Ended';
		}
		if (activeAuction?.auctionState === 3) {
			// If the auction is ended by a direct buy
			state = 'Direct Buy';
		}
		let isOwner =
			currentAddress?.toString().toLowerCase() ===
			activeAuction?.owner?.toString().toLowerCase(); // Check if the current address is the owner
		let isAuctionOpen = state === 'Open'; // Check if the auction is open
		// let isAuctionCancelled = state === "Cancelled"; // Check if the auction is cancelled
		let isAuctionEnded = state === 'Ended' || state === 'Direct Buy'; // Check if the auction is ended
		let isHighestBidder = currentAddress === activeAuction.highestBidder; // Check if the current address is the highest bidder

		return (
			<div>
				<div className="col">
					<button
						className="btn-secondary"
						onClick={() => setActiveAuction(null)}
					>
						Go Back
					</button>
					<p>ID: {activeAuction.tokenId}</p> {/* ID of the token */}
					<p>Highest Bid: {activeAuction.highestBid || 0} AVAX</p>
					{/* Highest bid */}
					<p>Direct Buy: {activeAuction.directBuyPrice} AVAX</p> {/* Direct buy price */}
					<p>Minimum Increment: {activeAuction.minIncrement} AVAX</p>{' '}
					{/* Minimum increment in AVAX */}
					<p>Starting Price: {activeAuction.startPrice} AVAX</p> {/* Starting price */}
					<p>Owner: {activeAuction.owner}</p> {/* Owner of the token */}
					<p>
						End Time:{' '}
						{Math.round((activeAuction.endTime * 1000 - Date.now()) / 1000 / 60)}{' '}
						{/* Time left in minutes */}
						minutes
					</p>
					<p>Auction State: {state}</p>
					<p>Token Value: {activeAuction.auctionTokenValue}</p>
				</div>
				<div className="col">
					<h3>Bids</h3>
					<table className="table">
						<thead>
							<tr>
								<th>Bidder</th>
								<th>Bid</th>
							</tr>
						</thead>
						<tbody>
							{activeAuction.bids.map((bid: any) => {
								return (
									<tr key={bid.bidder}>
										<td>{bid.bidder}</td>
										<td>{bid.bid} AVAX</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="col">
					{isAuctionOpen && !isOwner ? (
						<div>
							<input
								type="number"
								placeholder="0.5"
								onChange={(e) => setBidAmount(Number(e.target.value))}
							/>
							<button
								className="btn-primary btn"
								onClick={() => placeBid(bidAmount)}
							>
								Place Pid
							</button>
						</div>
					) : null}
					{isOwner && isAuctionOpen && activeAuction.bids.length == 0 ? (
						<button
							onClick={() => cancelAuction()}
							className="btn-danger btn"
						>
							Cancel Auction
						</button>
					) : null}

					{isOwner && isAuctionEnded && activeAuction.bids.length > 0 ? (
						<button
							onClick={() => withdrawFunds()}
							className="btn-secondary btn"
						>
							Withdraw Funds
						</button>
					) : null}
					{((activeAuction.bids.length == 0 && isOwner) || isHighestBidder) &&
					isAuctionEnded ? (
						<button
							onClick={() => withdrawToken()}
							className="btn-secondary btn"
						>
							Withdraw Token
						</button>
					) : null}
				</div>
			</div>
		);
	};

	return (
		<div>
			<div className="jumbotron d-flex align-items-center">
				<div className="container">
					{activeAuction != null ? (
						renderActiveAuction()
					) : (
						<div className="auctions row">{auctionList.map(renderAuctionElement)}</div>
					)}
				</div>
			</div>
			<div className="container">
				<form>
					<div className="mb-3">
						<div className="mb-3">
							<label className="form-label mr-3">Start Price</label>
							<input
								value={startPrice}
								onChange={(e: any) => setStartPrice(e.target.value)}
								type="number"
								className="form-control"
								id="startprice"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label mr-3">Token Id</label>
							<input
								value={tokenId}
								onChange={(e: any) => setTokenId(e.target.value)}
								type="number"
								className="form-control"
								id="startprice"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label mr-3">Minimum Increment</label>
							<input
								value={minIncrement}
								onChange={(e: any) => setMinIncrement(e.target.value)}
								type="number"
								className="form-control"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label mr-3">Direct Buy Price</label>
							<input
								value={directBuyPrice}
								onChange={(e: any) => setDirectBuyPrice(e.target.value)}
								type="number"
								className="form-control"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label mr-3">Duration In Minutes</label>
							<input
								value={endTime}
								onChange={(e: any) => setEndTime(e.target.value)}
								type="number"
								className="form-control"
							/>
						</div>
					</div>

					<div className="mb-3">
						<button
							type="button"
							onClick={() =>
								createAuction({
									startPrice,
									tokenId,
									minIncrement,
									directBuyPrice,
									endTime,
								})
							}
							className="bg-primary text-white border p-3 mr-2"
						>
							Create Auction
						</button>
						<button
							type="button"
							onClick={() => mint()}
							className="bg-slate-900 text-white border p-3"
						>
							Mint NFT
						</button>
					</div>
					{myItems?.length > 0 && (
						<p>
							Your items
							<br />
							{(myItems || ['']).map((x: any) => `id: ${x} `) || ''}
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default NftDemo;

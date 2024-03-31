import React, { useState } from "react";
import data from "./data";
import "./styles.css";

export const Accordian = () => {
	const [selected, setSelected] = useState(null);
	const [enableMultiSelect, setEnableMultiSelect] = useState(false);
	const [multiple, setMultiple] = useState([]);

	const handleSingleSelection = (getCurrentId) => {
		setSelected(getCurrentId === selected ? null : getCurrentId);
	};
	const handleMultiselection = (getCurrentId) => {
		let cpyMultiple = [...multiple];
		const findIndexOfCurentId = cpyMultiple.indexOf(getCurrentId);
		// if id is not present in the current array "cpymultiple" then it equals to -1
		if (findIndexOfCurentId === -1) cpyMultiple.push(getCurrentId);
		else cpyMultiple.splice(findIndexOfCurentId, 1);
		setMultiple(cpyMultiple);
	};

	return (
		<div className="wrapper">
			<button onClick={() => setEnableMultiSelect(!enableMultiSelect)}>
				Enable multi Selection
			</button>
			<div className="accordian">
				{data && data.length > 0 ? (
					data.map((dataItem, i) => (
						<div className="item" key={i}>
							<div
								onClick={
									enableMultiSelect
										? () => handleMultiselection(dataItem.id)
										: () => handleSingleSelection(dataItem.id)
								}
								className="title"
							>
								<h3>{dataItem.question}</h3>
								<span>+</span>
							</div>
							{selected === dataItem.id ||
							multiple.indexOf(dataItem.id) !== -1 ? (
								<div className="content">{dataItem.answer}</div>
							) : null}
						</div>
					))
				) : (
					<div>no data found</div>
				)}
			</div>
		</div>
	);
};

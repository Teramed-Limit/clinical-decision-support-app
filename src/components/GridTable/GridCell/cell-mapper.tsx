import AnalyzeOrNavigateCell from './AnalyzeOrNavigateCell/AnalyzeOrNavigateCell';
import ButtonCell from './ButtonCell/ButtonCell';
import CheckboxCell from './CheckboxCell/CheckboxCell';
import ChipCell from './ChipCell/ChipCell';
import LinkCell from './LinkCell/LinkCell';
import StatusChipCell from './StatusChipCell/StatusChipCell';

export const CellMapper = {
	chipRenderer: ChipCell,
	checkboxRenderer: CheckboxCell,
	buttonRenderer: ButtonCell,
	linkRenderer: LinkCell,
	statusRenderer: StatusChipCell,
	analyzeOrNavigateRenderer: AnalyzeOrNavigateCell,
};

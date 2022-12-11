import { PaperSelect } from 'react-native-paper-select';

import getStyles from './styles';

import { SelectInputContrato } from './types';

const SelectInput = ({
  titulo,
  selecionarTodos = false,
  multi,
  valor,
  listagem,
  selecionados,
  callback,
  style
}: SelectInputContrato): JSX.Element => {
  const styles = getStyles();

  return (
        <PaperSelect
            containerStyle={style}
            dialogStyle={styles.select.dialog}
            textInputBackgroundColor={styles.select.backgroundColor}
            dialogButtonLabelStyle={styles.select.dialog.botoes}
            checkboxColor={styles.select.dialog.checkboxColor}
            checkboxLabelStyle={styles.select.dialog.checkboxLabel}
            hideSearchBox={true}
            selectAllEnable={selecionarTodos}
            selectAllText="Selectionar todos"
            label={titulo}
            modalCloseButtonText="Cancelar"
            modalDoneButtonText="Selecionar"
            value={valor}
            onSelection={callback}
            arrayList={[...listagem]}
            selectedArrayList={[...selecionados]}
            multiEnable={multi}
            errorText=""
        />
  );
};

export default SelectInput;

import { PaperSelect } from 'react-native-paper-select';

import getStyles from './styles';

import { SelectInputContrato } from './types';

const SelectInput = ({
  inputRef,
  nextInputRef,
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
            inputRef={inputRef}
            containerStyle={style}
            dialogStyle={styles.select.dialog}
            outlineColor={styles.select.outline.color}
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
            onSelection={(params) => {
              callback(params);
              nextInputRef?.current?.focus();
            }}
            arrayList={[...listagem]}
            selectedArrayList={[...selecionados]}
            multiEnable={multi}
            errorText=""
        />
  );
};

export default SelectInput;

import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { toggleAudioEnabled } from '../../actions/audio';
import { Button, Stack, TextContainer, TextStyle } from '@shopify/polaris';
import TestAudio from './TestAudio';

interface Props {
  readonly value: boolean;
}

interface Handlers {
  readonly onChange: () => void;
}

class ToggleAudio extends React.PureComponent<Props & Handlers> {
  private static calculateButtonContent = (active: boolean) =>
    active ? 'Disable' : 'Enable';

  private static calculateBodyContent = (active: boolean) =>
    active ? 'enabled' : <TextStyle variation="strong">disabled</TextStyle>;

  public render() {
    const { value, onChange } = this.props;

    return (
      <Stack alignment="baseline" distribution="equalSpacing">
        <TextContainer>
          Audio is globally {ToggleAudio.calculateBodyContent(value)}.
        </TextContainer>
        <Stack alignment="baseline" distribution="trailing">
          <TestAudio></TestAudio>
          <Button primary onClick={onChange}>
            {ToggleAudio.calculateButtonContent(value)}
          </Button>
        </Stack>
      </Stack>
    //   <SettingToggle
    //     action={{
    //       content: ToggleAudio.calculateButtonContent(value),
    //       onAction: onChange
    //     }}
    //     enabled={value}
    //   >
    //     Audio is globally {ToggleAudio.calculateBodyContent(value)}.
    //   </SettingToggle>
    );
  }
}

const mapState = (state: RootState): Props => ({
  value: state.audioSettingsV1.enabled
});

const mapDispatch: Handlers = {
  onChange: toggleAudioEnabled
};

export default connect(mapState, mapDispatch)(ToggleAudio);

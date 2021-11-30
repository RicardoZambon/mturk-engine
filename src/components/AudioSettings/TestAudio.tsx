import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { testAudio } from '../../actions/audio';
import { Button } from '@shopify/polaris';

interface Props {
  readonly enabled: boolean;
}

interface Handlers {
  readonly onChange: () => void;
}

class TestAudio extends React.PureComponent<Props & Handlers, never> {
	buttonDisabled = false;

	public render() {

    const onChange = () => {
    	this.buttonDisabled = true;
			this.forceUpdate();

    	setTimeout(() => {
    		this.buttonDisabled = false;
				this.forceUpdate();
    	}, 2500);

			this.props.onChange();
		}

    return (
      <Button disabled={!this.props.enabled || this.buttonDisabled} onClick={onChange}>
        Test audio
      </Button>
    );
  }
}

const mapState = (state: RootState): Props => ({
  enabled: state.audioSettingsV1.enabled
});

const mapDispatch: Handlers = {
  onChange: testAudio
};

export default connect(mapState, mapDispatch)(TestAudio);

import 'dart:html';

import 'package:redux/redux.dart';

import '../actions/actions.dart' as actions;
import '../app.dart';
import '../state/app_state.dart';
import '../util.dart' as util;

load_file_middleware(Store<AppState> store, action, NextDispatcher next) {
  next(action);

  if (action is actions.LoadDNAFile) {
    document.title = action.filename;
    var design_view = app?.view?.design_view;
    if (design_view != null) {
      design_view.render(store.state);

      // if moving strands, clear the buffer; otherwise save it to copy into new design
      if (design_view.copy_action != null && !design_view.copy_action.copy) {
        design_view.clear_copy_buffer();
      }
    }

    // re-center if necessary
    if (store.state.ui_state.autofit && store.state.design != null) {
      util.fit_and_center();
    }
  }
}

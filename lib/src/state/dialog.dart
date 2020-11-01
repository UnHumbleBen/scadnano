import 'dart:math';

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import '../serializers.dart';

part 'dialog.g.dart';

typedef OnSubmit = void Function(List<DialogItem> items);

/// Describes form for pop-up dialog interacting with user.
abstract class Dialog with BuiltJsonSerializable implements Built<Dialog, DialogBuilder> {
  factory Dialog.from([void Function(DialogBuilder) updates]) = _$Dialog;

  Dialog._();

  static Serializer<Dialog> get serializer => _$dialogSerializer;

  @memoized
  int get hashCode;

  /************************ end BuiltValue boilerplate ************************/

  String get title;

  BuiltList<DialogItem> get items;

  // The cache_responses_key key is used to cache responses to all dialogs of this same "type".
  // Define it in such a way that responses to one type of dialog make sense for another type.
  // If not defined, the title is used as the key. (WARNING; this may cause exceptions if two
  // dialogs with incompatible responses use the same title!)
  String get prev_responses_key;

  // Whether to override cached responses, i.e., if true, then this Dialog's data will populate the
  // Dialog view regardless of what the user typed last time it was open (which is stored in
  // the React component state as prev_responses)
  bool get use_prev_responses;

  // if i,j are both in a sublist within this list, then they must be indices of DialogCheckboxes,
  // and whenever one is switched on, the others will turn off.
  BuiltList<BuiltList<int>> get mutually_exclusive_checkbox_groups;

  // if disable_when_any_radio_button_selected[i][j] == ['abc', 'def'], then
  // when DialogRadio at index j (starting at 0 in items) have either 'abc' or 'def' selected,
  // the DialogItem at index i should be disabled
  BuiltMap<int, BuiltMap<int, BuiltList<String>>> get disable_when_any_radio_button_selected;

  // if disable_when_any_checkboxes_on[i] == [j_1,j_2,...j_k], then
  // when DialogCheckbox at any of indices j_1,j_2,...,j_k (starting at 0 in items) are CHECKED,
  // the DialogItem at index i should be disabled
  BuiltMap<int, BuiltList<int>> get disable_when_any_checkboxes_on;

  // if disable_when_any_checkboxes_off[i] == [j_1,j_2,...j_k], then
  // when DialogCheckbox at any of indices j_1,j_2,...,j_k (starting at 0 in items) are UNCHECKED,
  // the DialogItem at index i should be disabled
  BuiltMap<int, BuiltList<int>> get disable_when_any_checkboxes_off;

  @nullable
  @BuiltValueField(serialize: false, compare: false)
  OnSubmit get on_submit;

  factory Dialog(
      {String title,
      String prev_responses_key,
      Iterable<DialogItem> items,
      bool use_prev_responses = false,
      Iterable<Iterable<int>> mutually_exclusive_checkbox_groups = const [],
      Map<int, Iterable<int>> disable_when_any_checkboxes_on = const {},
      Map<int, Map<int, Iterable<String>>> disable_when_any_radio_button_selected = const {},
      Map<int, Iterable<int>> disable_when_any_checkboxes_off = const {}}) {
    if (prev_responses_key == null) {
      prev_responses_key = title;
    }
    List<BuiltList<int>> mutually_exclusive_checkbox_groups_half_built = [
      for (var group in mutually_exclusive_checkbox_groups) BuiltList<int>(group)
    ];
    Map<int, BuiltList<int>> disable_when_any_checkboxes_on_half_built = {
      for (var idx in disable_when_any_checkboxes_on.keys)
        idx: BuiltList<int>(disable_when_any_checkboxes_on[idx])
    };
    Map<int, BuiltList<int>> disable_when_any_checkboxes_off_half_built = {
      for (var idx in disable_when_any_checkboxes_off.keys)
        idx: BuiltList<int>(disable_when_any_checkboxes_off[idx])
    };

    Map<int, Map<int, BuiltList<String>>> disable_when_any_radio_button_selected_quarter_built = {};
    for (int idx in disable_when_any_radio_button_selected.keys) {
      disable_when_any_radio_button_selected_quarter_built[idx] = {};
      for (int radio_idx in disable_when_any_radio_button_selected[idx].keys) {
        disable_when_any_radio_button_selected_quarter_built[idx][radio_idx] =
            disable_when_any_radio_button_selected[idx][radio_idx].toBuiltList();
      }
    }
    ;

    Map<int, BuiltMap<int, BuiltList<String>>> disable_when_any_radio_button_selected_half_built = {
      for (int idx in disable_when_any_radio_button_selected_quarter_built.keys)
        idx: disable_when_any_radio_button_selected_quarter_built[idx].build()
    };

    return Dialog.from((b) => b
      ..title = title
      ..prev_responses_key = prev_responses_key
      ..use_prev_responses = use_prev_responses
      ..items.replace(items)
      ..mutually_exclusive_checkbox_groups.replace(mutually_exclusive_checkbox_groups_half_built)
      ..disable_when_any_radio_button_selected.replace(disable_when_any_radio_button_selected_half_built)
      ..disable_when_any_checkboxes_on.replace(disable_when_any_checkboxes_on_half_built)
      ..disable_when_any_checkboxes_off.replace(disable_when_any_checkboxes_off_half_built));
  }
}

abstract class DialogItem {
  String get label;

  dynamic get value;
}

abstract class DialogInteger
    with BuiltJsonSerializable
    implements DialogItem, Built<DialogInteger, DialogIntegerBuilder> {
  factory DialogInteger.from([void Function(DialogIntegerBuilder) updates]) = _$DialogInteger;

  DialogInteger._();

  static Serializer<DialogInteger> get serializer => _$dialogIntegerSerializer;

  factory DialogInteger({String label, num value}) {
    return DialogInteger.from((b) => b
      ..label = label
      ..value = value);
  }

  /************************ end BuiltValue boilerplate ************************/

  String get label;

  num get value;
}

abstract class DialogFloat
    with BuiltJsonSerializable
    implements DialogItem, Built<DialogFloat, DialogFloatBuilder> {
  factory DialogFloat.from([void Function(DialogFloatBuilder) updates]) = _$DialogFloat;

  DialogFloat._();

  static Serializer<DialogFloat> get serializer => _$dialogFloatSerializer;

  factory DialogFloat({String label, num value}) {
    return DialogFloat.from((b) => b
      ..label = label
      ..value = value);
  }

  /************************ end BuiltValue boilerplate ************************/

  String get label;

  num get value;
}

abstract class DialogText
    with BuiltJsonSerializable
    implements DialogItem, Built<DialogText, DialogTextBuilder> {
  factory DialogText.from([void Function(DialogTextBuilder) updates]) = _$DialogText;

  DialogText._();

  static Serializer<DialogText> get serializer => _$dialogTextSerializer;

  factory DialogText({String label, int size = null, String value = ''}) {
    if (size == null) {
      size = size_from_text(value);
    }
    return DialogText.from((b) => b
      ..label = label
      ..size = size
      ..value = value);
  }

  /************************ end BuiltValue boilerplate ************************/

  String get label;

  String get value;

  int get size;
}

// calculate size of text field from its length
int size_from_text(String value, {int minimum = 20}) => max(minimum, value.length);

abstract class DialogTextArea
    with BuiltJsonSerializable
    implements DialogItem, Built<DialogTextArea, DialogTextAreaBuilder> {
  factory DialogTextArea.from([void Function(DialogTextAreaBuilder) updates]) = _$DialogTextArea;

  DialogTextArea._();

  static Serializer<DialogTextArea> get serializer => _$dialogTextAreaSerializer;

  factory DialogTextArea({String label, int cols, int rows, String value = ''}) {
    return DialogTextArea.from((b) => b
      ..label = label
      ..cols = cols
      ..rows = rows
      ..value = value);
  }

  /************************ end BuiltValue boilerplate ************************/

  String get label;

  int get cols;

  int get rows;

  String get value;
}

abstract class DialogCheckbox
    with BuiltJsonSerializable
    implements DialogItem, Built<DialogCheckbox, DialogCheckboxBuilder> {
  factory DialogCheckbox.from([void Function(DialogCheckboxBuilder) updates]) = _$DialogCheckbox;

  DialogCheckbox._();

  static Serializer<DialogCheckbox> get serializer => _$dialogCheckboxSerializer;

  factory DialogCheckbox({String label, bool value = false}) {
    return DialogCheckbox.from((b) => b
      ..label = label
      ..value = value);
  }

  /************************ end BuiltValue boilerplate ************************/

  String get label;

  bool get value;
}

abstract class DialogSelect
    with BuiltJsonSerializable
    implements DialogItem, Built<DialogSelect, DialogSelectBuilder> {
  factory DialogSelect.from([void Function(DialogSelectBuilder) updates]) = _$DialogSelect;

  DialogSelect._();

  static Serializer<DialogSelect> get serializer => _$dialogSelectSerializer;

  /************************ end BuiltValue boilerplate ************************/

  factory DialogSelect({String label, BuiltList<String> options, int selected_idx = 0, String value = null}) {
    return DialogSelect.from((b) => b
      ..options.replace(options)
      ..selected_idx = selected_idx
      ..label = label
      ..value = value);
  }

  BuiltList<String> get options;

  int get selected_idx;

  String get label;

  String get value;
}

abstract class DialogRadio
    with BuiltJsonSerializable
    implements DialogItem, Built<DialogRadio, DialogRadioBuilder> {
  factory DialogRadio.from([void Function(DialogRadioBuilder) updates]) = _$DialogRadio;

  DialogRadio._();

  static Serializer<DialogRadio> get serializer => _$dialogRadioSerializer;

  /************************ end BuiltValue boilerplate ************************/

  factory DialogRadio({String label, Iterable<String> options, int selected_idx = 0}) {
    return DialogRadio.from((b) => b
      ..options.replace(options)
      ..selected_idx = selected_idx
      ..label = label);
  }

  BuiltList<String> get options;

  int get selected_idx;

  String get label;

  String get value => options[selected_idx];
}

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:scadnano/src/state/dna_design.dart';

import '../json_serializable.dart';
import '../serializers.dart';
import '../constants.dart' as constants;
import '../util.dart' as util;

part 'modification.g.dart';

abstract class Modification {
  String get display_text;

  String get id;

  String get idt_text;

  int get font_size;

  bool get display_connector;

  BuiltMap<String, Object> unused_fields;

  Map<String, dynamic> to_json_serializable({bool suppress_indent = false});

  static Map<String, dynamic> mod_to_json_serializable(Modification mod, bool suppress_indent) {
    var map = {
      constants.mod_display_text_key: mod.display_text,
      constants.mod_font_size_key: mod.font_size,
      constants.mod_display_connector_key: mod.display_connector,
      constants.mod_id_key: mod.id,
      if (mod.idt_text != null) constants.mod_idt_text_key: mod.idt_text,
    };
    map.addAll(mod.unused_fields.toMap());
    return map;
  }

  static Modification from_json(Map<String, dynamic> json_map) {
    String location = json_map[constants.mod_location_key];
    Modification mod;
    if (location == "5'") {
      mod = Modification5Prime.from_json(json_map);
    } else if (location == "3'") {
      mod = Modification3Prime.from_json(json_map);
    } else if (location == "internal") {
      mod = ModificationInternal.from_json(json_map);
    } else {
      throw IllegalDNADesignError('unknown Modification location "${location}"');
    }

    mod.unused_fields = util.unused_fields_map(json_map, constants.modification_keys).build();
    return mod;
  }
}

abstract class Modification5Prime
    with BuiltJsonSerializable
    implements Built<Modification5Prime, Modification5PrimeBuilder>, Modification {
  factory Modification5Prime(
      {String display_text,
      String id,
      String idt_text,
      bool display_connector,
      int font_size}) = _$Modification5Prime._;

  Modification5Prime._();

  static Serializer<Modification5Prime> get serializer => _$modification5PrimeSerializer;

  /************************ end BuiltValue boilerplate ************************/

  String get display_text;

  String get id;

  String get idt_text;

  bool get display_connector;

  BuiltMap<String, Object> unused_fields;

  @nullable
  int get font_size;

  Map<String, dynamic> to_json_serializable({bool suppress_indent = false}) {
    var ret = Modification.mod_to_json_serializable(this, suppress_indent);
    ret[constants.mod_location_key] = "5'";
    return ret;
  }

  static Modification5Prime from_json(Map<String, dynamic> json_map) {
    String display_text = json_map[constants.mod_display_text_key];
    int font_size = json_map[constants.mod_font_size_key];
    bool display_connector = util.get_value_with_default(json_map, constants.mod_display_connector_key, true);
    String id = json_map[constants.mod_id_key];
    String location = json_map[constants.mod_location_key];
    assert(location == "5'");
    String idt_text = json_map[constants.mod_idt_text_key];
    return Modification5Prime(
        display_text: display_text,
        id: id,
        idt_text: idt_text,
        font_size: font_size,
        display_connector: display_connector);
  }
}

abstract class Modification3Prime
    with BuiltJsonSerializable
    implements Built<Modification3Prime, Modification3PrimeBuilder>, Modification {
  factory Modification3Prime(
      {String display_text,
      String id,
      String idt_text,
      bool display_connector,
      int font_size}) = _$Modification3Prime._;

  Modification3Prime._();

  static Serializer<Modification3Prime> get serializer => _$modification3PrimeSerializer;

  /************************ end BuiltValue boilerplate ************************/

  String get display_text;

  String get id;

  String get idt_text;

  bool get display_connector;

  @nullable
  int get font_size;

  BuiltMap<String, Object> unused_fields;

  Map<String, dynamic> to_json_serializable({bool suppress_indent = false}) {
    var ret = Modification.mod_to_json_serializable(this, suppress_indent);
    ret[constants.mod_location_key] = "3'";
    return ret;
  }

  static Modification3Prime from_json(Map<String, dynamic> json_map) {
    String display_text = json_map[constants.mod_display_text_key];
    int font_size = json_map[constants.mod_font_size_key];
    bool display_connector = util.get_value_with_default(json_map, constants.mod_display_connector_key, true);
    String id = json_map[constants.mod_id_key];
    String location = json_map[constants.mod_location_key];
    assert(location == "3'");
    String idt_text = json_map[constants.mod_idt_text_key];
    return Modification3Prime(
        display_text: display_text,
        id: id,
        idt_text: idt_text,
        font_size: font_size,
        display_connector: display_connector);
  }
}

abstract class ModificationInternal
    with BuiltJsonSerializable
    implements Built<ModificationInternal, ModificationInternalBuilder>, Modification {
  factory ModificationInternal.from([void Function(ModificationInternalBuilder) updates]) =
      _$ModificationInternal;

  ModificationInternal._();

  static Serializer<ModificationInternal> get serializer => _$modificationInternalSerializer;

  factory ModificationInternal(
      {String display_text,
      String id,
      String idt_text,
      bool display_connector,
      BuiltSet<String> allowed_bases,
      int font_size}) = _$ModificationInternal._;

  /************************ end BuiltValue boilerplate ************************/

  String get display_text;

  String get id;

  String get idt_text;

  bool get display_connector;

  @nullable
  int get font_size;

  @nullable
  BuiltSet<String> get allowed_bases;

  BuiltMap<String, Object> unused_fields;

  Map<String, dynamic> to_json_serializable({bool suppress_indent = false}) {
    var ret = Modification.mod_to_json_serializable(this, suppress_indent);
    ret[constants.mod_location_key] = "internal";
    if (allowed_bases != null) {
      ret[constants.mod_allowed_bases_key] =
          suppress_indent ? NoIndent(allowed_bases.toList()) : allowed_bases.toList();
    }
    return ret;
  }

  static ModificationInternal from_json(Map<String, dynamic> json_map) {
    String display_text = json_map[constants.mod_display_text_key];
    int font_size = json_map[constants.mod_font_size_key];
    bool display_connector = util.get_value_with_default(json_map, constants.mod_display_connector_key, true);
    String id = json_map[constants.mod_id_key];
    String location = json_map[constants.mod_location_key];
    assert(location == "internal");
    String idt_text = json_map[constants.mod_idt_text_key];
    var allowed_bases_json = json_map[constants.mod_allowed_bases_key];
    var allowed_bases = allowed_bases_json == null ? null : BuiltSet<String>(allowed_bases_json);
    return ModificationInternal(
        display_text: display_text,
        id: id,
        idt_text: idt_text,
        allowed_bases: allowed_bases,
        font_size: font_size,
        display_connector: display_connector);
  }

  bool base_is_allowed(String base) => this.allowed_bases == null || this.allowed_bases.contains(base);
}
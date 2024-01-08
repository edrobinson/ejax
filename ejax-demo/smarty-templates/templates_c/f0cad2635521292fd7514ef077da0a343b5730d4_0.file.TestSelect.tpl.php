<?php
/* Smarty version 4.3.4, created on 2023-12-19 21:44:14
  from 'C:\wamp64\www\ejax-demo\smarty-templates\TestSelect.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_65820eae01e6c8_47022447',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'f0cad2635521292fd7514ef077da0a343b5730d4' => 
    array (
      0 => 'C:\\wamp64\\www\\ejax-demo\\smarty-templates\\TestSelect.tpl',
      1 => 1703012223,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_65820eae01e6c8_47022447 (Smarty_Internal_Template $_smarty_tpl) {
?><select class="me-3" id="TestSelect" name="TestSelect" onChange="runTest()" style="border: 1px solid green">
<option value="">------------ Select a Test to Run ------------</option>
<option value="assign">Assign</option>
<option value="append">Append </option>
<option value="prepend">Prepend</option>
<option value="replace">Replace in Text</option>
<option value="clearText">Clear Text</option>
<option value="create">Create Element</option>
<option value="remove">Remove Element</option>
<option value="addCSS">Add Css Style</option>
<option value="removeCSS">Remove CSS Style</option>
<option value="alert">Show an Alert</option>
<option value="script">Run JS Code</option>
<option value="call">Call a JS Method</option>
<option value="userFunc">Call a User Function</option>
<!--<option value=""></option>-->
</select>
<br/>
<select id="sfield" name="sfield">
<option value="">Select the id of the field to be altered.</option>
<option value="name">Form Name</option>
<option value="email">Form Email</option>
<option value="website">Form Website</option>
<option value="subject">Form Subject</option>
<option value="message">Form Message</option>
<option value="target">Target Div</option>
</select><?php }
}

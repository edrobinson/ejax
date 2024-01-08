<?php
/* Smarty version 4.3.4, created on 2023-12-19 21:44:13
  from 'C:\wamp64\www\ejax-demo\smarty-templates\index.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_65820eadef5647_64736582',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'c74c5ba92222a64b70ea11466910fdb6e4a05488' => 
    array (
      0 => 'C:\\wamp64\\www\\ejax-demo\\smarty-templates\\index.tpl',
      1 => 1703015046,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:TestSelect.tpl' => 1,
  ),
),false)) {
function content_65820eadef5647_64736582 (Smarty_Internal_Template $_smarty_tpl) {
?>    <div class="d-flex justify-content-center">
      <button class="btn btn-primary me-2" onclick="sayWelcome()">Click for Welcome</button>
      <button class="btn btn-primary me-2" onclick="getImage()">Click for Image</button>
      <button class="btn btn-primary" id="testBtn">Event and Handler Target</button>
    </div>
    
    <div class="d-flex justify-content-center mt-3"><?php $_smarty_tpl->_subTemplateRender("file:TestSelect.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?></div>
    
       <!-- A contact form to be sent to the server -->
       <div class="d-flex justify-content-center mt-3 mb-3">
          <form class="form" id="form1">
            <div class="row">
              <div class="form-group col-md-6">
                <input type="text" class="form-control" name="name" id="name" placeholder="Your Name (name)">
              </div>
              <div class="form-group col-md-6">
                <input type="email" class="form-control" name="email" id="email" placeholder="Your Email(email)">
              </div>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="website" id="website" placeholder="Website URL(website)">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject(subject)">
            </div>
            <div class="form-group">
              <textarea class="form-control" name="message" id="message" rows="5" placeholder="Message(message)" style="border: 1px solid red"></textarea>
            </div>
            <div class="text-center mt-3"><button class="btn btn-primary" type="button" onclick="submitForm()" id="sendForm">Send Message</button></div>
          </form>
        </div>
        <!-- End Contact Form -->

    <!-- The servr side code sends the responses to this div. -->
    <div class="d-flex justify-content-center mb-3" 
    id="target" name="target" style="border: 1px solid green";height="20px";width="100%">Target</div>
    <!-- Content Ends -->
    <?php echo '<script'; ?>
 src="assets/Ejax/src/Ejax.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="assets/js/index.js"><?php echo '</script'; ?>
>
    
<?php }
}

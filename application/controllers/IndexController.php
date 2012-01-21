<?php

class Shifts extends Zend_Db_Table_Abstract {
	protected $_name = 'shifts';
}

class IndexController extends Zend_Controller_Action {
	
	public function init() {
		$options = array ('host' => getDbHost (), 'username' => getDbUser (), 'password' => getDbPassword (), 'dbname' => getDbName () );
		$db = Zend_Db::factory ( 'PDO_MYSQL', $options );
	}
	
	public function indexAction() {
	
	}
	
	public function reportshiftAction() {
	
	}
	
	public function reportsessionAction() {
	
	}
	
	public function removeshiftAction() {
	
	}
	
	public function removesessionAction() {
	
	}
	
	public function listAction() {
		$month = $this->getRequest ()->getParam ( "month" );
		if (! $month) {
			$month = date ( "m" );
		}
		$select = $this->db->select ()->from ( "shifts" )->where ( "MONTH(date) = $month" );
		$stmt = $this->db->query ( $select );
		$result = $stmt->fetchAll ();
		echo json_encode ( $result );
		die ( 0 );
	}
}

/**
 *
 * @return string the container db host
 */
function getDbHost() {
	return get_cfg_var ( 'zend_developer_cloud.db.host' );
}

/**
 *
 * @return string the container db name
 */
function getDbName() {
	return get_cfg_var ( 'zend_developer_cloud.db.name' );
}

/**
 *
 * @return string the container db user
 */
function getDbUser() {
	return get_cfg_var ( 'zend_developer_cloud.db.username' );
}

/**
 *
 * @return string the container db password
 */
function getDbPassword() {
	return get_cfg_var ( 'zend_developer_cloud.db.password' );
}

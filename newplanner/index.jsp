<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"  %>
<%@ page import="java.util.List" %>
<%@ page import="com.java.planner.Planner" %>

<html>
	<head>
		<title>work hard buddy!</title>
		<link type="text/css" rel="stylesheet" href="assets/styles.css">
		<link type="text/css" rel="stylesheet" href="dist/chkbox.css">
		<script src="dist/jsfun.js" type="text/javascript"></script>
	</head>
	<body>
		<div class="main-wrapper"> 
			<div class="table-wrapper">
				<h2>Today's work..</h2>
				<form action="StudentControllerServlet" method="get" id="nameform">
				<input type="hidden" name="command"  value="MAKECHANGE">
				<table id="tablesh">
					<tr>		
						<th>Task </th>
						<th>Priority</th>
					</tr>
					<!-- take date in variable -->
					<c:set var = "now" value = "<%= new java.util.Date()%>" />
					<fmt:formatDate pattern="yyyy-MM-dd" var="nowdd"  value="${now}" />
					
					<c:forEach items="${PLANS_LIST}" var="tempplan" >
					 <c:if test="${nowdd == tempplan.date}"> 
					<tr>
						<td><b>${tempplan.taskName}</b></td>
						<td>${tempplan.priority}</td>
						<c:if test="${tempplan.done eq 1}">
						<td>
								
      							<input type="checkbox" name="selection" value="${tempplan.id}" checked>
   
						</td>
						</c:if>
						<c:if test="${tempplan.done ne 1}">
						<td>
								
      							<input type="checkbox" name="selection" value="${tempplan.id}">
   
						</td>
						</c:if>
					</tr>
					</c:if>
					</c:forEach>
				</table>
				</form>
			</div>
			<div class="buttons-wrapper">
					<button  type="submit" class="button button5" form="nameform">Make Changes</button>
				 	
				 <form style='display:inline;' action="StudentControllerServlet" method="GET">
					 	<input type="hidden" name="command" value="EDIT"/>
						<input type="hidden" name="editit" value="${PLANS_LIST}"/>
						<button class="button button5" >Explore</button>
				 </form>
				 	 <button  type="submit" class="button button5" form="myform">Get TextFile</button>
				 	 <button  type="submit" class="button button5" form="mailform">Mail</button>
			</div>
				<form id="myform" onsubmit="alertford()" action="StudentControllerServlet" method="get">
					<input type="hidden" name="command" value="DOPRINT"/>
					<input type="hidden" name="editit" value="${PLANS_LIST}"/>
				</form>
				<form	method="get" action="mailto:hardikraja20@gmail.com" id="mailform">
					
				</form>

		</div>
	</body>
</html>